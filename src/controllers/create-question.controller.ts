import {
    Controller,
    Post,
    UseGuards
} from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js'
import { CurrentUser } from '../auth/current-user-decorator.js'
import type { UserPayload } from '../auth/jwt.strategy.js'

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor() {}

  @Post()
  async handle(@CurrentUser() user: UserPayload) {
    console.log(user.sub)
  }
}
