import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { typeDefs } from './data/models/schema.js';
import { resolvers} from './resolvers.js'
import cors from 'cors';
import bodyParser from 'body-parser';
import  './data/connections/connections.js'
import 'dotenv/config'
import express from "express";
import http from 'http';


const app = express();
const httpServer = http.createServer(app).listen(process.env.PORT || 4000, function () {
    console.log(`🚀🎊  Server is running on ${process.env.PORT}...`);
});;

app.use(cors());

//setup server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start();

app.use('/graphql', cors(), bodyParser.json({ limit: '50mb' }), expressMiddleware(server));

//check server is running or not
app.use('/server/health', (req, res, next) => {
    res.send({success: true, message: 'Demo GraphQl Server is running..'});
});

// const { url } = await startStandaloneServer(server,{
//     listen: { port: process.env.PORT || 4000},
// })

    