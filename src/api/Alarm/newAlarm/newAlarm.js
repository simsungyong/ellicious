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
                            to: "ck24loh8lud7u0b09vv7y8r2o"
                        }
                    }
                ]
            }).node();
        },
        resolve: payload=>payload
    }
}
}