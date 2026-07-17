import { Module } from '@nestjs/common';
import { EcosystemNodesController } from './ecosystem-nodes.controller';
import { EcosystemNodesService } from './ecosystem-nodes.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EcosystemNodesController],
  providers: [EcosystemNodesService],
  exports: [EcosystemNodesService],
})
export class EcosystemNodesModule {}
