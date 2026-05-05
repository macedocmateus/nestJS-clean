import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client.js'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionString = process.env.DATABASE_URL as string
    const url = new URL(connectionString)
    const schema = url.searchParams.get('schema') ?? undefined

    const adapter = new PrismaPg({ connectionString }, { schema })
    super({ adapter, log: ['query', 'warn', 'error'] })
  }
  onModuleInit() {
    return this.$connect()
  }
  onModuleDestroy() {
    return this.$disconnect()
  }
}
