import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas';
import { UsersService } from '../users/users.service';
import { CloudinaryService } from '@afkin/cloudinary';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
