import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        toggleLike: async(_,args,{request})=>{
            isAuthenticated(request);
            const {user} = request;
            const {postId} = args;

            const filterOptions = {
                AND : [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id: postId
                        }
                    }
                ]
            }; //prisma exist 문법.

            try{
                const existingLike = await prisma.$exists.like(filterOptions);
                if (existingLike){
                    await prisma.deleteManyLikes(filterOptions);
                }else {
                    await prisma.createLike({
                        user: {
                            connect:{
                                id: user.id
                            }
                        },
                        post: {
                            connect:{
                                id:postId
                            }
                        }
                    });
                }
                return true;
            } catch{
                return false;
            }

        }
    }
}