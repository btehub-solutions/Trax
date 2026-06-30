import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartnerDto, UpdatePartnerDto } from './dto/partner.dto';

@Injectable()
export class PartnersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePartnerDto) {
    return this.prisma.partner.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.partner.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findActive() {
    return this.prisma.partner.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    const partner = await this.prisma.partner.findUnique({
      where: { id },
      include: {
        articles: {
          select: { id: true, title: true, slug: true, publishedAt: true },
        },
      },
    });

    if (!partner) {
      throw new NotFoundException(`Partner with ID "${id}" not found`);
    }

    return partner;
  }

  async update(id: string, dto: UpdatePartnerDto) {
    await this.findById(id); // Throws if not found

    return this.prisma.partner.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findById(id); // Throws if not found

    return this.prisma.partner.delete({
      where: { id },
    });
  }
}
