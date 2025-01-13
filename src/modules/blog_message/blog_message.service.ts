import { Injectable } from '@nestjs/common';
import { CreateBlogMessageDto } from './dto/create-blog_message.dto';
import { UpdateBlogMessageDto } from './dto/update-blog_message.dto';

@Injectable()
export class BlogMessageService {
  create(createBlogMessageDto: CreateBlogMessageDto) {
    return 'This action adds a new blogMessage';
  }

  findAll() {
    return `This action returns all blogMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blogMessage`;
  }

  update(id: number, updateBlogMessageDto: UpdateBlogMessageDto) {
    return `This action updates a #${id} blogMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogMessage`;
  }
}
