import { Module } from '@nestjs/common';
import { AnimalHistoryService } from './animal_history.service';
import { AnimalHistoryController } from './animal_history.controller';

@Module({
  controllers: [AnimalHistoryController],
  providers: [AnimalHistoryService],
})
export class AnimalHistoryModule {}
