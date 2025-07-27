import { listAllNotesResolver } from "../resolvers/note.resolver.js";
import { GraphQLList } from "graphql";
import { NoteType } from "../types/note.type.js";
export const noteFields = {
  Query: {
    listAllNotes: {
      type: new GraphQLList(NoteType),
      resolve: listAllNotesResolver,
    },
  },
};
