import { Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service.js'
import { PrismaService } from './prisma/prisma.service.js'

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('/hello')
  async test() {
    return await this.prisma.user.findMany()
  }
}
