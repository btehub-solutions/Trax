import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

const BCRYPT_ROUNDS = 12;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly safeSelect = {
    id:        true,
    name:      true,
    email:     true,
    role:      true,
    bio:       true,
    avatar:    true,
    twitter:   true,
    linkedin:  true,
    createdAt: true,
    updatedAt: true,
  };

  async create(dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);

    return this.prisma.user.create({
      data: {
        name:     dto.name,
        email:    dto.email,
        password: hashedPassword,
        role:     dto.role || 'WRITER',
      },
      select: this.safeSelect,
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select:  this.safeSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where:  { id },
      select: {
        ...this.safeSelect,
        articles: {
          where:   { status: 'PUBLISHED' },
          take:    10,
          orderBy: { publishedAt: 'desc' },
          select:  { id: true, title: true, slug: true, publishedAt: true, category: true },
        },
      },
    });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findById(id);
    return this.prisma.user.update({
      where:  { id },
      data:   dto,
      select: this.safeSelect,
    });
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted' };
  }

  async getProfile(id: string) {
    return this.findById(id);
  }
}
