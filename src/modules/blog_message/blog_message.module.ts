import { Module } from '@nestjs/common';
import { BlogMessageService } from './blog_message.service';
import { BlogMessageController } from './blog_message.controller';

@Module({
  controllers: [BlogMessageController],
  providers: [BlogMessageService],
})
export class BlogMessageModule {}
