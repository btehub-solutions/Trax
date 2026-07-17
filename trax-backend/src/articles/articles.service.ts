import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RevalidationService } from '../revalidation/revalidation.service';
import {
  CreateArticleDto,
  UpdateArticleDto,
  ArticleQueryDto,
} from './dto/article.dto';
import { ArticleStatus } from '../prisma-enums';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly revalidate: RevalidationService,
  ) {}

  private readonly include = {
    author:   { select: { id: true, name: true, avatar: true, role: true } },
    category: true,
    tags:     { include: { tag: true } },
    partner:  true,
  } as const;

  async create(dto: CreateArticleDto, authorId: string) {
    const { tagIds, ...data } = dto;
    const publishedAt = data.publishedAt
      ? new Date(data.publishedAt)
      : data.status === ArticleStatus.PUBLISHED
      ? new Date()
      : undefined;

    const article = await this.prisma.article.create({
      data: {
        ...data,
        publishedAt,
        authorId,
        tags: tagIds?.length
          ? { create: tagIds.map((tagId) => ({ tagId })) }
          : undefined,
      },
      include: this.include,
    });

    if (article.status === ArticleStatus.PUBLISHED) {
      void this.revalidate.triggerRevalidation({ tag: 'articles', path: '/' });
      if (article.category?.slug) {
        void this.revalidate.triggerRevalidation({ path: `/${article.category.slug}` });
      }
    }

    return article;
  }

  async findAll(query: ArticleQueryDto) {
    const {
      category,
      tag,
      status = ArticleStatus.PUBLISHED,
      featured,
      page  = 1,
      limit = 12,
      isSponsored,
      partnerId,
    } = query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where = {
      ...(status      ? { status }                                         : {}),
      ...(featured    ? { featured: featured === 'true' }                  : {}),
      ...(category    ? { category: { slug: category } }                   : {}),
      ...(tag         ? { tags: { some: { tag: { slug: tag } } } }         : {}),
      ...(isSponsored ? { isSponsored: isSponsored === 'true' }            : {}),
      ...(partnerId   ? { partnerId }                                      : {}),
    };

    const [articles, total] = await Promise.all([
      this.prisma.article.findMany({ where, skip, take, orderBy: { publishedAt: 'desc' }, include: this.include }),
      this.prisma.article.count({ where }),
    ]);

    return {
      data: articles,
      meta: { total, page: Number(page), limit: take, pages: Math.ceil(total / take) },
    };
  }

  async findBySlug(slug: string) {
    const article = await this.prisma.article.findUnique({
      where: { slug },
      include: this.include,
    });
    if (!article) throw new NotFoundException(`Article "${slug}" not found`);
    return article;
  }

  async findById(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: this.include,
    });
    if (!article) throw new NotFoundException(`Article ${id} not found`);
    return article;
  }

  // ── Ownership check: WRITERs can only modify their own articles ───────────
  private assertOwnership(article: any, userId: string, userRole: string) {
    if (userRole === 'ADMIN' || userRole === 'EDITOR') return;
    if (article.authorId !== userId) {
      throw new ForbiddenException('You can only modify your own articles');
    }
  }

  async update(id: string, dto: UpdateArticleDto, userId: string, userRole: string) {
    const existing = await this.findById(id);
    this.assertOwnership(existing, userId, userRole);

    const { tagIds, ...data } = dto;

    let publishedAt: Date | null | undefined = undefined;
    if (data.publishedAt !== undefined) {
      publishedAt = data.publishedAt ? new Date(data.publishedAt) : null;
    } else if (data.status === ArticleStatus.PUBLISHED) {
      if (existing && !existing.publishedAt) {
        publishedAt = new Date();
      }
    }

    const article = await this.prisma.article.update({
      where: { id },
      data: {
        ...data,
        ...(publishedAt !== undefined && { publishedAt }),
        ...(tagIds !== undefined && {
          tags: {
            deleteMany: {},
            create: tagIds.map((tagId) => ({ tagId })),
          },
        }),
      },
      include: this.include,
    });

    // Revalidate if it was or now is published
    if (article.status === ArticleStatus.PUBLISHED || existing.status === ArticleStatus.PUBLISHED) {
      void this.revalidate.triggerRevalidation({ tag: 'articles', path: '/' });
      void this.revalidate.triggerRevalidation({ path: `/articles/${article.slug}` });
      if (existing.slug !== article.slug) {
        void this.revalidate.triggerRevalidation({ path: `/articles/${existing.slug}` });
      }
      if (article.category?.slug) {
        void this.revalidate.triggerRevalidation({ path: `/${article.category.slug}` });
      }
    }

    return article;
  }

  async remove(id: string, userId: string, userRole: string) {
    const article = await this.findById(id);
    this.assertOwnership(article, userId, userRole);

    await this.prisma.article.delete({ where: { id } });

    if (article.status === ArticleStatus.PUBLISHED) {
      void this.revalidate.triggerRevalidation({ tag: 'articles', path: '/' });
      void this.revalidate.triggerRevalidation({ path: `/articles/${article.slug}` });
      if (article.category?.slug) {
        void this.revalidate.triggerRevalidation({ path: `/${article.category.slug}` });
      }
    }

    return { message: 'Article deleted' };
  }

  async publish(id: string) {
    const existing = await this.findById(id);
    const article = await this.prisma.article.update({
      where: { id },
      data: { status: ArticleStatus.PUBLISHED, publishedAt: new Date() },
      include: this.include,
    });

    void this.revalidate.triggerRevalidation({ tag: 'articles', path: '/' });
    void this.revalidate.triggerRevalidation({ path: `/articles/${article.slug}` });
    if (article.category?.slug) {
      void this.revalidate.triggerRevalidation({ path: `/${article.category.slug}` });
    }

    return article;
  }

  async getFeatured(limit = 5) {
    return this.prisma.article.findMany({
      where: { featured: true, status: ArticleStatus.PUBLISHED },
      take: limit,
      orderBy: { publishedAt: 'desc' },
      include: this.include,
    });
  }

  async getTrending(limit = 6) {
    return this.prisma.article.findMany({
      where: { trending: true, status: ArticleStatus.PUBLISHED },
      take: limit,
      orderBy: { publishedAt: 'desc' },
      include: this.include,
    });
  }
}
