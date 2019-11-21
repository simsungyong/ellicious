import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Query: {
        seeCategory: async(_, args,{request})=>{
            isAuthenticated(request);
            const {userId} = args;
            return prisma.categories({where:{
                user:{
                    id:userId
                }
            }});
        }
    }
}
