import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { noteFields } from "./fields/note.field.js";

export const mainSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "MainQuerySchema",
    description: "This is Main Query Schema",
    fields: {
      ...noteFields.Query,
    },
  }),
});
