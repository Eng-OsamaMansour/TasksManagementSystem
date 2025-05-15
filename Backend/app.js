const express = require('express');
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const {buildSchema} = require("graphql");
const mongoose = require("mongoose");


const app = express();
app.use(bodyParser.json());

app.use('/graphql',graphqlHttp({
    schema: buildSchema(`
        type project{
            _id: ID!
            title: String!
            description: String!
            category: String!
            startDate: String!
            endDate: String!
            status: String!
        }
        type task{
            name: String!
            description: String!
            status: String!
            dueDate: String!            
        }
        input projectInput{
            _id: ID!
            title: String!
            description: String!
            category: String!
            startDate: String!
            endDate: String!
            status: String!
        }
        input taskInput{
            name: String!
            description: String!
            status: String!
            dueDate: String!            
        }
        type RootQuery{
            projects: [project!]
            tasks: [task!]
        }
        type RootMutation{
            createProject(ProjectInput:projectInput ): project
            createTask(TaskInput:taskInput): task
        }
        schema{
            query:RootQuery
            mutation:RootMutation
        }
        `),
    rootValue: {}
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.dbzdwkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    app.listen(5000);
})
.catch(err =>{
    console.log(err);
});

