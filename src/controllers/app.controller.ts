import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';

@Controller('')
export class AppController {
  constructor() {}

  @Get()
  @Public()
  async getStatus(): Promise<string> {
    return 'Everything is working';
  }
}
