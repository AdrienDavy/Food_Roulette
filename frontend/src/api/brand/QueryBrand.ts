import { gql } from "../../gql";


export const queryBrand = gql(`
query QueryBrand($brandId: ID!) { 
  brand(id: $brandId) {    
    id
    name
    image
  }
}
`);
