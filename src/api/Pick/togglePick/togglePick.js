import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import axios from 'axios';

export default {
    Mutation: {
        togglePick: async(_,args,{request})=>{
            isAuthenticated(request);
            const {user} = request;
            const {postId} = args;
            const token = await prisma.post({id:postId}).user().notifyToken();

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
                    if(token){
                        await axios.post("https://exp.host/--/api/v2/push/send",{
                        to : token,
                        title:"ellicous",
                        body: `${user.username}님이 맛지도를 Pick했습니다`
                    });
                    }
                }
                return true;
            } catch {
                return false;
            }

            
        }
    }
}