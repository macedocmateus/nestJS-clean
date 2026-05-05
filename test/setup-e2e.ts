import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client.js'

if (!process.env.DATABASE_URL) {
  throw new Error('Please provide a DATABASE_URL environment variable.')
}

function generateUniqueDatabaseURL(schemaId: string) {
  const url = new URL(process.env.DATABASE_URL as string)
  url.searchParams.set('schema', schemaId)
  return url.toString()
}

let prisma: PrismaClient
let schemaId: string

beforeAll(async () => {
  schemaId = randomUUID()
  const databaseURL = generateUniqueDatabaseURL(schemaId)

  process.env.DATABASE_URL = databaseURL

  const adapter = new PrismaPg({ connectionString: databaseURL })
  prisma = new PrismaClient({ adapter })

  execSync('pnpm prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(
    `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`,
  )
  await prisma.$disconnect()
})
