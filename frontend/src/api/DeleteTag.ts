import { gql } from "../gql";


export const mutationDeleteTag = gql(`
mutation DeleteTag($id: ID!) {
  deleteTag(id: $id) {
    id
  }
}
`);