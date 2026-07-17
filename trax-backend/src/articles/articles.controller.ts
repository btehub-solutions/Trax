import {
  Body, Controller, Delete, Get, Param, Patch,
  Post, Query, Request, UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto, ArticleQueryDto } from './dto/article.dto';
import { Roles, RolesGuard } from '../auth/roles.guard';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // ── Public ────────────────────────────────────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'List published articles (paginated, filterable)' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'tag',      required: false })
  @ApiQuery({ name: 'featured', required: false })
  @ApiQuery({ name: 'page',     required: false })
  @ApiQuery({ name: 'limit',    required: false })
  findAll(@Query() query: ArticleQueryDto) {
    return this.articlesService.findAll(query);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured articles' })
  getFeatured(@Query('limit') limit?: number) {
    return this.articlesService.getFeatured(limit);
  }

  @Get('trending')
  @ApiOperation({ summary: 'Get trending articles' })
  getTrending(@Query('limit') limit?: number) {
    return this.articlesService.getTrending(limit);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a single article by slug' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  findBySlug(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug, false);
  }

  @Get(':slug/preview')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'EDITOR', 'WRITER')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get a single article for preview (draft or published)' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  findPreviewBySlug(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug, true);
  }

  // ── Authenticated ─────────────────────────────────────────────────────────

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'EDITOR', 'WRITER')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new article' })
  create(@Body() dto: CreateArticleDto, @Request() req: any) {
    return this.articlesService.create(dto, req.user.id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'EDITOR', 'WRITER')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update an article' })
  update(@Param('id') id: string, @Body() dto: UpdateArticleDto, @Request() req: any) {
    return this.articlesService.update(id, dto, req.user.id, req.user.role);
  }

  @Patch(':id/publish')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Publish a draft article' })
  publish(@Param('id') id: string) {
    return this.articlesService.publish(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete an article (Admin only)' })
  remove(@Param('id') id: string, @Request() req: any) {
    return this.articlesService.remove(id, req.user.id, req.user.role);
  }
}
