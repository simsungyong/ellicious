import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";
import { ROOM_FRAGMENT, MESSAGE_FRAGMENT } from "../../../fragments";
export default {
    Mutation: {
        sendMessage: async(_, args, {request})=>{
            isAuthenticated(request);
            const {user} = request;
            const {roomId, message, toId} =  args; //graphql을 보면 ! 이 없는데 값이 null일수도 있기때문에!
            let room;
            if(roomId === undefined){
                if(user.id !== toId){
                    room = await prisma.createRoom({
                        participants:{
                            connect:[{id: toId}, {id:user.id}]
                        }
                    }).$fragment(ROOM_FRAGMENT);
                }
            } else {
                room = await prisma.room({id:roomId}).$fragment(ROOM_FRAGMENT);
            }
            if(!room){
                throw Error("room not fount");
            }
            const getTo = room.participants.filter(participant=>participant.id !== user.id)[0];
            return prisma.createMessage({
                text: message,
                from: {
                    connect: {id : user.id}
                },
                to: {
                    connect:{
                        id: roomId ? getTo.id : toId
                    }
                },
                room :{
                    connect:{
                        id : room.id
                    }
                }
            })
        }
    }
}