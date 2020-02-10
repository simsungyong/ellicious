import { prisma } from "../../../../generated/prisma-client";

export default {
    Subscription: {
        newMessage: {
            subscribe: (_, args) => {
                const { roomId,userId } = args;
                if(roomId){
                    return prisma.$subscribe.message({
                        AND: [
                            { mutation_in: "CREATED" },
                            {
                                node: {
                                    room: { id: roomId }
                                }
                            }
                        ]
                    }).node();
                }else if(userId){
                    return prisma.$subscribe.message({
                        AND: [
                            { mutation_in: "CREATED" },
                            {
                                node: {
                                    to: { id: userId }
                                }
                            }
                        ]
                    }).node();
                }    
            },
            resolve: payload => payload
        }
    }
};