import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateWithoutPostInput } from "../inputs/UserCreateWithoutPostInput";
import { UserUpdateWithoutPostInput } from "../inputs/UserUpdateWithoutPostInput";

@TypeGraphQL.InputType("UserUpsertWithoutPostInput", {
  isAbstract: true
})
export class UserUpsertWithoutPostInput {
  @TypeGraphQL.Field(_type => UserUpdateWithoutPostInput, {
    nullable: false
  })
  update!: UserUpdateWithoutPostInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutPostInput, {
    nullable: false
  })
  create!: UserCreateWithoutPostInput;
}
