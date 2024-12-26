import { gql } from "../gql";


export const mutationCreateTag = gql(`
mutation CreateTag($data: TagCreateInput!) {
  createTag(data: $data) {
    id
  }
}
`);