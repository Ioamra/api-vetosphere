import { Global, Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { GeneratePostManCollectionService } from './services/generatePostmanCollection.service';
import { MailService } from './services/mail.service';

@Global()
@Module({
  controllers: [CommonController],
  providers: [MailService, GeneratePostManCollectionService],
  exports: [MailService],
})
export class CommonModule {}
