import {
  Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { Roles, RolesGuard } from '../auth/roles.guard';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'List all categories' })
  async findAll() {
    try {
      return await this.categoriesService.findAll();
    } catch (e: any) {
      const dbUrl = process.env.DATABASE_URL || '';
      const match = dbUrl.match(/:([^:@]+)@/);
      const password = match ? match[1] : '';
      return {
        error: true,
        message: e.message || 'Unknown error',
        stack: e.stack,
        env: {
          DATABASE_URL_exists: !!process.env.DATABASE_URL,
          POSTGRES_URL_exists: !!process.env.POSTGRES_URL,
          POSTGRES_PRISMA_URL_exists: !!process.env.POSTGRES_PRISMA_URL,
          connectionStringSanitized: dbUrl.replace(/:[^:@]+@/g, ':***@'),
          passwordDetails: {
            length: password.length,
            trimmedLength: password.trim().length,
            startsWithP: password.startsWith('P'),
            endsWithR: password.endsWith('R'),
          }
        }
      };
    }
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get category by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.categoriesService.findBySlug(slug);
  }

  @Post('seed')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Seed default categories (Admin)' })
  seed() {
    return this.categoriesService.seed();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a category (Admin)' })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update a category (Admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete a category (Admin)' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
