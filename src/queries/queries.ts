import { gql } from '@apollo/client';

export const GET_SEARCHED_ANIME = gql`
  query getAnime($input: String!, $page: Int!) {
    Page(page: $page, perPage: 5) {
        pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(search: $input ,sort: SCORE_DESC) {
        id
        title {
          romaji
        }
        description(asHtml: false)
        averageScore
        coverImage {
          large
        }
      }
    }
  }
`;