import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addChildComment: async (_, args, {request})=>{
            isAuthenticated(request);
            const {user} = request;
            const {text, headComment, postId} = args;
            //const token = await prisma.user()
                return prisma.createChildComment({
                    user:{
                        connect:{
                            id:user.id
                        }
                    },
                    headComment:{
                        connect:{
                            id:headComment
                        }
                    },
                   
                    text,
                
                });
            }
            
        
    }
}