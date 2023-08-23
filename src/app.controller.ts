import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

@Controller('upload')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private s3 = new AWS.S3(),
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const uploadParams = {
      Bucket: 'your-bucket-name',
      Key: file.originalname,
      Body: file.buffer,
    };
    try {
      const data = await this.s3.upload(uploadParams).promise();
      return {
        message: 'File uploaded successfully',
        url: data.Location,
      };
    } catch (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
  }
}
