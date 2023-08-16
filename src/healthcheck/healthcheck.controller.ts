import { Controller, Get } from '@nestjs/common';

@Controller('')
export class HealthcheckController {
  @Get('/')
  returnStatus(): { status: number; message: string } {
    return {
      status: 200,
      message: 'Server is up. Go to /graphql to interact with the api',
    };
  }
}
