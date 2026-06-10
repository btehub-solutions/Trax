import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

// Default categories seeded on first run
export const DEFAULT_CATEGORIES = [
  { name: 'Startups', slug: 'startups', color: '#10B981', description: 'Tech startup launches, growth stories and fundraises' },
  { name: 'Funding',     slug: 'funding',     color: '#059669', description: 'Investment rounds, VCs and capital flows in Ogun State Tech' },
  { name: 'Tools',       slug: 'tools',       color: '#3B82F6', description: 'Product launches, developer tools and SaaS solutions' },
  { name: 'People',      slug: 'people',      color: '#8B5CF6', description: 'Founders, developers and builders driving innovation forward' },
  { name: 'Policy',      slug: 'policy',      color: '#F59E0B', description: 'Regulation, government strategy and tech governance' },
  { name: 'Research',    slug: 'research',    color: '#EC4899', description: 'Papers, breakthroughs and academic developments' },
  { name: 'Ecosystem',   slug: 'ecosystem',   color: '#C84B31', description: 'Hubs, events and the wider Ogun State tech ecosystem' },
  { name: 'Events',      slug: 'events',      color: '#06B6D4', description: 'Conferences, summits and community gatherings' },
];

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    for (const cat of DEFAULT_CATEGORIES) {
      await this.prisma.category.upsert({
        where:  { slug: cat.slug },
        update: {},
        create: cat,
      });
    }
    return { message: 'Categories seeded' };
  }

  async create(dto: CreateCategoryDto) {
    return this.prisma.category.create({ data: dto });
  }

  async findAll() {
    return this.prisma.category.findMany({ orderBy: { name: 'asc' } });
  }

  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({ where: { slug } });
    if (!category) throw new NotFoundException(`Category "${slug}" not found`);
    return category;
  }

  async findById(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException(`Category ${id} not found`);
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findById(id);
    return this.prisma.category.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.category.delete({ where: { id } });
    return { message: 'Category deleted' };
  }
}
