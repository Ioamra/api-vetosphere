import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { GeneratePostManCollectionService } from './services/generatePostmanCollection.service';
import { MailService } from './services/mail.service';

@Module({
  controllers: [CommonController],
  providers: [MailService, GeneratePostManCollectionService],
  exports: [MailService],
})
export class CommonModule {}
