import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { MailService } from './services/mail.service';

@Module({
  controllers: [CommonController],
  providers: [MailService],
  exports: [MailService],
})
export class CommonModule {}
