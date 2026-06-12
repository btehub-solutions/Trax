import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

const BCRYPT_ROUNDS = 12;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  // ── Bcrypt password hashing ───────────────────────────────────────────────
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  // Legacy SHA-256 check (for migrating old passwords)
  private legacySha256(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  // Detect if a stored hash is an old SHA-256 hex string (always 64 chars)
  private isLegacyHash(hash: string): boolean {
    return /^[a-f0-9]{64}$/.test(hash);
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
        password: await this.hashPassword(dto.password),
        // Role is always WRITER for public registration (field removed from DTO)
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
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    let passwordValid = false;

    if (this.isLegacyHash(user.password)) {
      // ── Migration path: verify against old SHA-256, then re-hash to bcrypt ──
      passwordValid = user.password === this.legacySha256(dto.password);
      if (passwordValid) {
        const bcryptHash = await this.hashPassword(dto.password);
        await this.prisma.user.update({
          where: { id: user.id },
          data:  { password: bcryptHash },
        });
      }
    } else {
      // ── Normal bcrypt verification ──
      passwordValid = await bcrypt.compare(dto.password, user.password);
    }

    if (!passwordValid) {
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
