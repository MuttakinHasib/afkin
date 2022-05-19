import { CloudinaryService } from '@afkin/cloudinary';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

@Injectable()
export class UploadService {
  constructor(private readonly cloudinary: CloudinaryService) {}

  async uploadImage(
    file: Express.Multer.File
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new UnprocessableEntityException('Invalid file type.');
    });
  }
}
