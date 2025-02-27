import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        next
        prev
      }
      results {
        id
        name
        species
        image
      }
    }
  }
`;