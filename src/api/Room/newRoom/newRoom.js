import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";


export default {
    Subscription : {
        newRoom:{
            subscribe: (_,__,{request})=>{
            isAuthenticated(request);
            const {user} = request;
            return prisma.$subscribe.room({
                AND:[
                    {mutation_in:"CREATED"},
                    {
                        node: {
                            participants_some:{id: user.id}
                        }
                    }
                ]
            }).node();
        },
        resolve: payload=>payload
    }
}
}