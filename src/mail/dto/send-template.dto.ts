import { readdirSync } from "fs";
import { Address } from "nodemailer/lib/mailer";

export type Template = 'recovery';
export type Lang = 'ru' | 'en' | 'pt' | 'es';

export class SendTemplateDto {
  template: Template;
  to: string | Address | Array<string | Address>;
  lang: Lang;
  params: { [key: string]: any };
}