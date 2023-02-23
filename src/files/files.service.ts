import { Injectable } from '@nestjs/common';
import { JsonWorkerService } from 'src/json-worker/json-worker.service';
import { GetFilesDto } from './dto/get-files.dto';
import { UploadFileDto } from './dto/upload-file.dto';

const TABLE_NAME = 'files'

@Injectable()
export class FilesService {
  constructor(
    private readonly jsonWorkerService: JsonWorkerService,
  ) {}

  getMany(dto: GetFilesDto) {
    return this.jsonWorkerService.getMany(TABLE_NAME, dto)
  }

  saveFile(dto: UploadFileDto) {
    return this.jsonWorkerService.create(TABLE_NAME, dto)
  }

  getFiles(dto: GetFilesDto) {
    const searchParams = {
      userId: +dto.userId,
      orderId: +dto.orderId
    }
    console.log(searchParams)
    return this.jsonWorkerService.findOne(TABLE_NAME, searchParams)
  }

  getOrderFiles(dto: GetFilesDto) {
    const searchParams = {
      userId: +dto.userId,
      orderId: +dto.orderId
    }
    return this.jsonWorkerService.findOne(TABLE_NAME, searchParams)
  }
}
