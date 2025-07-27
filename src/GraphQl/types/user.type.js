import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";

export const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type definition",
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLString },
    gender: { type: GraphQLString },
  }),
});
