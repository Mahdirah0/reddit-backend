import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutPostInput } from "../inputs/UserCreateOrConnectWithoutPostInput";
import { UserCreateWithoutPostInput } from "../inputs/UserCreateWithoutPostInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserCreateNestedOneWithoutPostInput", {
  isAbstract: true
})
export class UserCreateNestedOneWithoutPostInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutPostInput, {
    nullable: true
  })
  create?: UserCreateWithoutPostInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutPostInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutPostInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;
}
