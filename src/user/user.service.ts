import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';
import { ICRUDService } from 'src/shared/interfaces/crud/service/ICRUD';
import { User } from './types';

@Injectable()
export class UserService
  extends BasePrismaCrudService<
    User,
    User.Args.Create,
    User.Args.FindMany,
    User.Args.FindOne,
    User.Args.Delete,
    User.Args.Update
  >
  implements ICRUDService
{
  constructor(
    protected prisma: PrismaService,
    @Inject('model') recourse: string,
  ) {
    super(prisma, recourse);
  }
  async findByEmail(email: string) {
    return await this.findOne({ email });
  }
  async me(userId: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
