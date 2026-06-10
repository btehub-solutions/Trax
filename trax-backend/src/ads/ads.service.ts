import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdSlotDto, UpdateAdSlotDto } from './dto/ad-slot.dto';

@Injectable()
export class AdsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAdSlotDto) {
    return this.prisma.adSlot.create({ data: dto });
  }

  async findAll(activeOnly = false) {
    return this.prisma.adSlot.findMany({
      where:   activeOnly ? { active: true } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const slot = await this.prisma.adSlot.findUnique({ where: { id } });
    if (!slot) throw new NotFoundException(`Ad slot ${id} not found`);
    return slot;
  }

  async findBySize(size: string) {
    return this.prisma.adSlot.findMany({
      where: { size: size.toUpperCase() as any, active: true },
    });
  }

  async update(id: string, dto: UpdateAdSlotDto) {
    await this.findById(id);
    return this.prisma.adSlot.update({ where: { id }, data: dto });
  }

  async toggle(id: string) {
    const slot = await this.findById(id);
    return this.prisma.adSlot.update({
      where: { id },
      data:  { active: !slot.active },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.adSlot.delete({ where: { id } });
    return { message: 'Ad slot deleted' };
  }
}
