import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateArticleDto,
  UpdateArticleDto,
  ArticleQueryDto,
} from './dto/article.dto';
import { ArticleStatus } from '../prisma-enums';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly include = {
    author:   { select: { id: true, name: true, avatar: true, role: true } },
    category: true,
    tags:     { include: { tag: true } },
  } as const;

  async create(dto: CreateArticleDto, authorId: string) {
    const { tagIds, ...data } = dto;
    return this.prisma.article.create({
      data: {
        ...data,
        authorId,
        tags: tagIds?.length
          ? { create: tagIds.map((tagId) => ({ tagId })) }
          : undefined,
      },
      include: this.include,
    });
  }

  async findAll(query: ArticleQueryDto) {
    const {
      category,
      tag,
      status = ArticleStatus.PUBLISHED,
      featured,
      page  = 1,
      limit = 12,
    } = query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where = {
      ...(status   ? { status }                                         : {}),
      ...(featured ? { featured: featured === 'true' }                  : {}),
      ...(category ? { category: { slug: category } }                   : {}),
      ...(tag      ? { tags: { some: { tag: { slug: tag } } } }         : {}),
    };

    const [articles, total] = await this.prisma.$transaction([
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

  async update(id: string, dto: UpdateArticleDto) {
    await this.findById(id);
    const { tagIds, ...data } = dto;

    return this.prisma.article.update({
      where: { id },
      data: {
        ...data,
        ...(tagIds !== undefined && {
          tags: {
            deleteMany: {},
            create: tagIds.map((tagId) => ({ tagId })),
          },
        }),
      },
      include: this.include,
    });
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.article.delete({ where: { id } });
    return { message: 'Article deleted' };
  }

  async publish(id: string) {
    await this.findById(id);
    return this.prisma.article.update({
      where: { id },
      data: { status: ArticleStatus.PUBLISHED, publishedAt: new Date() },
      include: this.include,
    });
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
