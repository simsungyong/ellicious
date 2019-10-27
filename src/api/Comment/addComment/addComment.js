import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addComment: async (_, args, {request})=>{
            isAuthenticated(request);
            const {user} = request;
            const {text, postId, headComment} = args;

            if(!headComment){
                return prisma.createComment({
                    user:{
                        connect:{
                            id: user.id
                        }
                    },
                    post:{
                        connect:{
                            id: postId
                        }
                    },
                    text
                });
            }else {
                return prisma.createComment({
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
                    post:{
                        connect:{
                            id: postId
                        }
                    },
                    text
                });
            }
            
        }
    }
}