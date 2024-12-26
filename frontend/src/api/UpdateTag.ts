import { gql } from "../gql";


export const mutationUpdateTag = gql(`
mutation UpdateTag($data: TagUpdateInput!, $id:ID!) {
  updateTag(data: $data, id:$id) {
    id
  }
}
`);