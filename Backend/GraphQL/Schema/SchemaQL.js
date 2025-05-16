const { buildSchema } = require('graphql');
module.exports = buildSchema(`
      type Project {
        _id: ID!
        title: String!
        description: String!
        category: String!
        startDate: String!
        endDate: String!
        status: String!
      }

      type Task {
        _id: ID!
        name: String!
        description: String!
        status: String!
        dueDate: String!
      }

      type User{
        _id: ID!
        username: String!   
        password: String
        role: String!
        universityID: String!
      }

      input ProjectInput {
        title: String!
        description: String!
        category: String!
        startDate: String!
        endDate: String!
        status: String!
      }

      input TaskInput {
        name: String!
        description: String!
        status: String!
        dueDate: String!
      }

      input UserInput{
        username: String!   
        password: String!
        role: String!
        universityID: String!
      }
        
      type Query {
        projects: [Project!]!
        tasks: [Task!]!
      }

      type Mutation {
        createProject(ProjectInput: ProjectInput): Project
        createTask(TaskInput: TaskInput): Task
        createUser(UserInput: UserInput): User
      }

      schema {
        query: Query
        mutation: Mutation
      }
    `)