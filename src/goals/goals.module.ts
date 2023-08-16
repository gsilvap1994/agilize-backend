import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GoalsResolver } from './goals.resolver';
import { GoalsService } from './goals.service';

@Module({
  providers: [PrismaService, GoalsResolver, GoalsService],
})
export class GoalsModule {}
