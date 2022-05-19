import { Injectable } from '@nestjs/common';
import { UserDocument } from '../users/schemas';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.findOne(email);

    if (user && (await user.comparePassword(password))) {
      return user;
    }

    return null;
  }
}
