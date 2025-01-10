import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogMessageDto } from './create-blog_message.dto';

export class UpdateBlogMessageDto extends PartialType(CreateBlogMessageDto) {}
