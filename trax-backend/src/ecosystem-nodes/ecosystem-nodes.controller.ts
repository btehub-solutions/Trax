import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { EcosystemNodesService } from './ecosystem-nodes.service';
import { CreateEcosystemNodeDto, UpdateEcosystemNodeDto } from './dto/ecosystem-node.dto';
import { Roles, RolesGuard } from '../auth/roles.guard';

@ApiTags('Ecosystem Directory')
@Controller('ecosystem-nodes')
export class EcosystemNodesController {
  constructor(private readonly nodesService: EcosystemNodesService) {}

  @Get()
  @ApiOperation({ summary: 'List all ecosystem nodes (startups, hubs, labs)' })
  findAll() {
    return this.nodesService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new ecosystem node' })
  create(@Body() dto: CreateEcosystemNodeDto) {
    return this.nodesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update an ecosystem node' })
  update(@Param('id') id: string, @Body() dto: UpdateEcosystemNodeDto) {
    return this.nodesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete an ecosystem node' })
  remove(@Param('id') id: string) {
    return this.nodesService.remove(id);
  }
}
