import { isAuthenticated } from "../../../middlewares";
import {prisma} from '../../../../generated/prisma-client';

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
    Mutation: {
        editPost: async(_,args, {request})=>{
            isAuthenticated(request);
            const {id, caption, location, rating, category, details, action} = args;
            const {user} = request;

            const post= await prisma.$exists.post({id, user: {id:user.id}});
            if(post){
                if(action === EDIT){
                    return prisma.updatePost({
                        where:{id},
                        data:{
                            caption,
                            location, 
                            rating, 
                            details, 
                            category:{connect:{id:category}}
                        }
                    });
            }else if(action === DELETE){
                return prisma.deletePost({
                    id
                });
            }
        }else {
            throw Error("you can't do that");
        }
    }
}
}