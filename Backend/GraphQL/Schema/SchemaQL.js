const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Project {
      _id: ID!
      title: String!
      description: String!
      category: String!
      startDate: String!
      endDate: String!
      status: String!
      studentIds: [ID!]!       
      students: [User!]!      
    }
    type Task {
        _id: ID!
        name: String!
        description: String!
        status: String!
        dueDate: String!
        project: Project!            
        assignedStudent: User!
    }
    type User{
        _id: ID!
        username: String!   
        password: String
        role: String!
        universityID: String!
      }
    type AuthData {
        userId: ID!
        token: String!
        role: String!
    }
    input ProjectInput {
        title: String!
        description: String!
        category: String!
        startDate: String!
        endDate: String!
        status: String!
        studentIds: [ID!]!        
    }
    input TaskInput {
        name: String!
        description: String!
        status: String!
        dueDate: String!
        projectId: ID! 
        assignedStudentId: ID!
    }

    input UserInput{
        username: String!   
        password: String!
        role: String!
        universityID: String!
    }
    
    type Query {
        projects:      [Project!]!
        tasks:         [Task!]!
        students:      [User!]!      
        me:            User!         
    }
    type Mutation {
        login(username: String!, password: String!): AuthData!

        createProject(ProjectInput: ProjectInput): Project           # admin
        deleteProject(_id: ID!): Boolean                             # admin
        updateProjectStatus(_id: ID!, status: String!): Project      # admin

        createTask(TaskInput: TaskInput): Task                       # admin
        deleteTask(_id: ID!): Boolean                                # admin
        updateTaskStatus(_id: ID!, status: String!): Task            # admin OR assigned student

        createUser(UserInput: UserInput): User                       # admin
    }
    schema {
        query: Query
        mutation: Mutation
    }
    `);
