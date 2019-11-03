import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        togglePick: async(_,args,{request})=>{
            isAuthenticated(request);
            const {user} = request;
            const {postId} = args;

            const filterOptions = {
                AND : [
                    {
                        user: {
                            id:user.id
                        }
                    },
                    {
                        post: {
                            id:postId
                        }
                    }
                ]
            };

            try{
                const existingPick = await prisma.$exists.pick(filterOptions);
                if(existingPick){
                    await prisma.deleteManyPicks(filterOptions);
                }else {
                    await prisma.createPick({
                        user: {
                            connect: {
                                id:user.id
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
            } catch {
                return false;
            }

            
        }
    }
}