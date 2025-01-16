import { Prisma, User as PrismaUser } from '@prisma/client';
import { Base } from 'src/shared/types/base';
export type User = PrismaUser;
export namespace User {
  export namespace Inputs {
    export type Create = Prisma.UserUpdateInput;
    export type Update = Prisma.UserUpdateInput;
  }
  export namespace Args {
    export type Create = Prisma.UserCreateInput;
    export type Update = {
      where: Prisma.UserWhereUniqueInput;
      data: Prisma.UserUpdateInput;
    };
    export type FindMany = {
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    } & Base.Args.FindMany;
    export type FindOne = Prisma.UserWhereUniqueInput;

    export type Delete = Prisma.UserWhereUniqueInput;
  }
  export namespace Response {
    export type WithPlantCare = Prisma.UserGetPayload<{
      select: {
        id: true;
      };
      include: {
        plantCare: true;
      };
    }>;
  }
}
