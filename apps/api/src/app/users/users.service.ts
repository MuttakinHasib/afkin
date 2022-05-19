import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createHash } from '../utils/hash';
import { User, UserDocument } from './schemas';
import { CloudinaryService } from '@afkin/cloudinary';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOne(createUserDto.email);
    if (user) throw new ConflictException('User already exists');

    createUserDto.password = await createHash(createUserDto.password);
    await this.userModel.create(createUserDto);

    return {
      message: `Account created successfully`,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
