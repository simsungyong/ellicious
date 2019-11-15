import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Query: {
        seeCategory: async(_, __,{request})=>{
            isAuthenticated(request);
            const {user} = request;
            return prisma.categories({where:{
                user:{
                    id:user.id
                }
            }});
        }
    }
}
