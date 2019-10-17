import './env';
import {GraphQLServer} from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
//import {sendSecretMail} from './utils';
import "./passport";
import passport from "passport";
import { authenticateJwt } from './passport';

console.log(process.env.PORT);
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({schema, context:({request})=>({request})});
server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({port: PORT}, ()=> console.log(`running server on http://localhost:${PORT}`));