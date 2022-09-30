import { gql } from "apollo-server-express"; //will create a schema
const Schema = gql`
  type Person {
    id: ID!
    name: String
  }
  type Result {
    mentions: [String]
    emoticons: [String]
    links: [String]
  }
  type Query {
    getAllPeople: [Person] #will return multiple Person instances
    getPerson(id: Int): Person
    records(message: String): Result
  }
`;
export default Schema;
