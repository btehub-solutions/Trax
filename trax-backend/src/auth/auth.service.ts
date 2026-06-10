import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  // ── Simple SHA-256 password hash (swap for bcrypt in production) ──────────
  private hash(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email already registered');

    const user = await this.prisma.user.create({
      data: {
        name:     dto.name,
        email:    dto.email,
        password: this.hash(dto.password),
        role:     dto.role,
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    const token = this.signToken(user.id, user.email, user.role);
    return { user, access_token: token };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || user.password !== this.hash(dto.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.signToken(user.id, user.email, user.role);
    const { password: _, ...safeUser } = user;
    return { user: safeUser, access_token: token };
  }

  private signToken(userId: string, email: string, role: string): string {
    return this.jwt.sign({ sub: userId, email, role });
  }
}
