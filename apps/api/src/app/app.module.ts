import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MulterModule.register({
      storage: memoryStorage(), // use memory storage for having the buffer
    }),
    MongooseModule.forRoot(process.env.NX_MONGODB_URI),
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
