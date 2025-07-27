import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "./user.type.js";

export const NoteType = new GraphQLObjectType({
  name: "Note",
  description: "This is Note Type",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    ownerId: {
      type: UserType,
      resolve: (note) => note.ownerId,
    },
  }),
});
