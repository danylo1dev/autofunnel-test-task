import { User } from "@prisma/client";

export type LoginBody = Pick<User, "email" | "password">;
