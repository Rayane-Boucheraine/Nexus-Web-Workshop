import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UsePipes(new ValidationPipe())
  async createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
    const { title, description } = createPostDto;
    const userId = req.user.id;
    return this.postsService.createPost(title, description, userId);
  }

  @Get()
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-posts')
  async getPostsByUserId(@Request() req) {
    const userId = req.user.id;
    return this.postsService.getPostsByUserId(userId);
  }

  // New Route for getting a post by ID
  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(
      id,
      updatePostDto.title,
      updatePostDto.description,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}