import { AttachmentLikeObject } from "@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface";
import DKIM from "nodemailer/lib/dkim";
import { Address, TextEncoding } from "nodemailer/lib/mailer";

declare type Headers = {
  [key: string]: string | string[] | {
      prepared: boolean;
      value: string;
  };
} | Array<{
  key: string;
  value: string;
}>;

export class SendMailDto {
  to?: string | Address | Array<string | Address>;
  cc?: string | Address | Array<string>;
  bcc?: string | Address | Array<string | Address>;
  replyTo?: string | Address;
  inReplyTo?: string | Address;
  from?: string | Address;
  subject?: string;
  text?: string | Buffer | AttachmentLikeObject;
  html?: string | Buffer;
  sender?: string | Address;
  raw?: string | Buffer;
  textEncoding?: TextEncoding;
  date?: Date | string;
  headers?: Headers;
  context?: {
      [name: string]: any;
  };
  transporterName?: string;
  template?: string;
  attachments?: {
      filename: string;
      content?: any;
      path?: string;
      contentType?: string;
      cid?: string;
      encoding?: string;
      contentDisposition?: 'attachment' | 'inline' | undefined;
      href?: string;
  }[];
  dkim?: DKIM.Options;
}