import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

export const DEFAULT_CATEGORIES = [
  { name: 'Startups', slug: 'startups', color: '#10B981', description: 'Spotlight on startups and ventures' },
  { name: 'Funding', slug: 'funding', color: '#059669', description: 'Investments and VC updates' },
  { name: 'Tools', slug: 'tools', color: '#3B82F6', description: 'Libraries, code assets, and platforms' },
  { name: 'People', slug: 'people', color: '#8B5CF6', description: 'Profiles and interviews of prominent figures' },
  { name: 'Policy', slug: 'policy', color: '#D97706', description: 'Government roadmaps and regulations' },
  { name: 'Research', slug: 'research', color: '#DB2777', description: 'Academic papers and ML breakthroughs' },
  { name: 'Ecosystem', slug: 'ecosystem', color: '#C84B31', description: 'Tech hubs, clusters and networking' },
  { name: 'Events', slug: 'events', color: '#0891B2', description: 'tech summits, meetups and hackathons' },
  { name: 'Profiles', slug: 'profiles', color: '#7C3AED', description: 'Founder and builder spotlights' },
  { name: 'Health', slug: 'health', color: '#2563EB', description: 'HealthTech and digital health innovations' },
  { name: 'Interview', slug: 'interview', color: '#4F46E5', description: 'Exclusive executive interviews' },
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
