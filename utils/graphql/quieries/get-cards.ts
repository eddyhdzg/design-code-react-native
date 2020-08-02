import { gql } from "@apollo/client";

const GET_CARDS = gql`
  query GetCards {
    cardsCollection {
      items {
        title
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        subtitle
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
      }
    }
  }
`;

export default GET_CARDS;
