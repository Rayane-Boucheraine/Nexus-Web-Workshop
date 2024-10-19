import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  // Existing sign-up method
  async signUp(
    email: string,
    password: string,
    firstName: string,
    familyName: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          familyName,
        },
      });
      const token = this.jwtService.sign({ email, id: user.id });
      return { token };
    } catch (error) {
      throw new NotFoundException('Email is already in use');
    }
  }

  // Existing sign-in method
  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException('Invalid credentials');
    }
    const token = this.jwtService.sign({ email, id: user.id });
    return { token };
  }

  // New method to get the user profile by userId
  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // New method to update the user profile
  async updateProfile(userId: string, firstName: string, familyName: string) {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { firstName, familyName },
    });
    return updatedUser;
  }
}