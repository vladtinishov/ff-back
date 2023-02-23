import { Body, Controller, Get, Post, Query, Req, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/gurads/jwt-auth.guard';
import { GetFilesDto } from './dto/get-files.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { FilesService } from './files.service';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly service: FilesService) {}

  @Get('/')
  getOrders(@Query() dto: GetFilesDto) {
    return this.service.getMany(dto);
  }

  @Post('upload-avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploadedFiles/avatars'
    })
  }))
  uploadAvatar(@Req() request, @UploadedFile() file: Express.Multer.File) {
    this.service.saveFile({
      fileName: file.filename,
      type: 'avatars',
      userId: request.user.id
    })
  }

  @Post('upload-order-files')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploadedFiles/order-files'
    })
  }))
  uploadOrderFiles(@Req() request, @Body() dto: {orderId: number}, @UploadedFile() file: Express.Multer.File) {
    this.service.saveFile({
      fileName: file.filename,
      type: 'order-files',
      userId: request.user.id,
      orderId: +dto.orderId
    })
  }

  @Get('/get-files')
  async getFiles(@Query() dto: GetFilesDto, @Res({ passthrough: true }) response: Response) {
    const file = await this.service.getFiles(dto);

    const stream = createReadStream(join(process.cwd(), `/uploadedFiles/order-files/${file.fileName}`));
 
    response.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype
    })
  
    return new StreamableFile(stream);
  }

  @Get('/get-files-data')
  async getOrderFiles(@Query() dto: GetFilesDto) {
    return await this.service.getOrderFiles(dto)
  }
}
