import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogMessageService } from './blog_message.service';
import { CreateBlogMessageDto } from './dto/create-blog_message.dto';
import { UpdateBlogMessageDto } from './dto/update-blog_message.dto';

@Controller('blog-message')
export class BlogMessageController {
  constructor(private readonly blogMessageService: BlogMessageService) {}

  @Post()
  create(@Body() createBlogMessageDto: CreateBlogMessageDto) {
    return this.blogMessageService.create(createBlogMessageDto);
  }

  @Get()
  findAll() {
    return this.blogMessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogMessageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogMessageDto: UpdateBlogMessageDto) {
    return this.blogMessageService.update(+id, updateBlogMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogMessageService.remove(+id);
  }
}
