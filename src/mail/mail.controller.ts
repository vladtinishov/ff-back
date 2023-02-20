import { Body, Controller, Post } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail.dto';
import { SendTemplateDto } from './dto/send-template.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly service: MailService) {}

  @Post()
  async sendMail(@Body() data: SendMailDto) {
    return await this.service.sendMail(data);
  }

  @Post('/template')
  async sendTemplate(@Body() data: SendTemplateDto) {
    return await this.service.sendTemplate(data);
  }
}
