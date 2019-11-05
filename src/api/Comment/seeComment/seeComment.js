import { isAuthenticated } from "../../../middlewares";
import {prisma} from '../../../../generated/prisma-client';

export default {
    Query:{
        seeComment:async(_,args,{request})=>{
            const {postId} = args;
            /*const text = await prisma.comment({id});
            const posts = await prisma.user({id}).posts;
            const categories = await prisma.user({id}).category;
            const picks = await prisma.user({id}).picks;*/
            
            return prisma.comments({
                where:{
                    post: {
                        id: postId
                    }
                },
                orderBy:"createdAt_ASC"
            })
        }
    }
}