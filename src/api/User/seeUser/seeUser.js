import { isAuthenticated } from "../../../middlewares";
import {prisma} from '../../../../generated/prisma-client';

export default {
    Query:{
        seeUser:async(_,args,{request})=>{
            const {id} = args;
            const user = await prisma.user({id});
            const posts = await prisma.user({id}).posts;
            const categories = await prisma.user({id}).category;
            const picks = await prisma.user({id}).picks;

            return {
                user,posts, categories, picks
            }
        }
    }
}