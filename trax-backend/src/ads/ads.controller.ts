import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdsService } from './ads.service';
import { CreateAdSlotDto, UpdateAdSlotDto } from './dto/ad-slot.dto';
import { Roles, RolesGuard } from '../auth/roles.guard';

@ApiTags('Ads')
@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get()
  @ApiOperation({ summary: 'Get active ad slots (public, for frontend rendering)' })
  @ApiQuery({ name: 'size', required: false, example: 'LEADERBOARD' })
  findActive(@Query('size') size?: string) {
    if (size) return this.adsService.findBySize(size);
    return this.adsService.findAll(true);
  }

  // Admin only
  @Get('all')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all ad slots including inactive (Admin)' })
  findAll() {
    return this.adsService.findAll(false);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create an ad slot (Admin)' })
  create(@Body() dto: CreateAdSlotDto) {
    return this.adsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update an ad slot (Admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateAdSlotDto) {
    return this.adsService.update(id, dto);
  }

  @Patch(':id/toggle')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Toggle ad slot active/inactive (Admin)' })
  toggle(@Param('id') id: string) {
    return this.adsService.toggle(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete an ad slot (Admin)' })
  remove(@Param('id') id: string) {
    return this.adsService.remove(id);
  }
}
