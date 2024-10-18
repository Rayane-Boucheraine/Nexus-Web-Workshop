import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(title: string, description: string, userId: string) {
    return this.prisma.post.create({
      data: {
        title,
        description,
        userId,
      },
    });
  }

  async getAllPosts() {
    return this.prisma.post.findMany();
  }

  async getPostsByUserId(userId: string) {
    return this.prisma.post.findMany({
      where: { userId },
    });
  }

  async updatePost(id: string, title?: string, description?: string) {
    return this.prisma.post.update({
      where: { id },
      data: { title, description },
    });
  }

  async deletePost(id: string) {
    return this.prisma.post.delete({ where: { id } });
  }
}