import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
export default {
    Subscription : {
        newAlarm:{
            subscribe: (_,__,{request})=>{
            isAuthenticated(request);
            const {user} = request;
            //console.log(user.id)
            return prisma.$subscribe.alarm({
                AND:[
                    {mutation_in:"CREATED"},
                    {
                        node: {
                            to:{id:user.id}
                        }
                    }
                ]
            }).node();
        },
        resolve: payload=>payload
    }
}
}