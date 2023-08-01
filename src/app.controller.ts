import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  home() {
    return '퍼쇼널 어드민 서버';
  }
}
