import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";


export default {
    Mutation:{
        createStore: async(_,args, {request})=>{
            isAuthenticated(request);
            const {user} = request;
            const { 
                id,
                name,
                telnum,
                operatingTime,
                location,  
                menu} = args;
            
            const existingStore= await prisma.$exists.store({name, location});
            if(!existingStore){
                return prisma.createStore({
                    id,
                    name,
                    telnum,
                    operatingTime,
                    location,  
                    menu
                }); 
            } else {
                return true;
            }
        }
    }
}