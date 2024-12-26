import { gql } from "../../gql";


export const mutationUpdateShop = gql(`
mutation UpdateShop($data: ShopUpdateInput!, $updateShopId: ID!) {
  updateShop(data: $data, id: $updateShopId) {
    id
  }
}
`);