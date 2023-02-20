import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail.dto';
import { SendTemplateDto } from './dto/send-template.dto';

import * as Templates from './templates'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendMail(data: SendMailDto) {
    const res = await this.mailerService
      .sendMail(data)
    return res;
  }

  public async sendTemplate(data: SendTemplateDto) {
    const formattedTemplate = this.prepareTemplate(data)

    const res = await this.mailerService
      .sendMail({
        to: data.to,
        html: formattedTemplate,
      })

    return res;
  }

  private prepareTemplate(data: SendTemplateDto) {
    let template = Templates[data.template][data.lang]

    for (const key in data.params) {
      template = template.replace(`{{${key}}}`, data.params[key]);
    }

    return template;
  }
}
