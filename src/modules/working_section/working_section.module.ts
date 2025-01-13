import { Module } from '@nestjs/common';
import { WorkingSectionService } from './working_section.service';
import { WorkingSectionController } from './working_section.controller';

@Module({
  controllers: [WorkingSectionController],
  providers: [WorkingSectionService],
})
export class WorkingSectionModule {}
