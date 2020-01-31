import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Query:{
        recommendUser: async(_,__,{request})=>{
            isAuthenticated(request);
            const { user } = request;
            return await prisma.users({
                where:{
                    AND: [{followers_none:{id:user.id}}, {id_not:user.id}]
                }
            });
          }
        
    }
}