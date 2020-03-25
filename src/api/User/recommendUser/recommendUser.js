import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Query:{
        recommendUser: async(_,args)=>{
            isAuthenticated(request);
            //const { user } = request;
            return await prisma.users({
                first: args.items,
                skip: args.pageNumber,
            });
          }
        
    }
}