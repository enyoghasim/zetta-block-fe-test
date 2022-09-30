import { gql } from "apollo-server-express"; //will create a schema
const Schema = gql`
  type Link {
    title: String
    url: String
  }
  type Result {
    mentions: [String]
    emoticons: [String]
    links: [Link]
  }
  type Query {
    records(message: String): Result
  }
`;
export default Schema;
