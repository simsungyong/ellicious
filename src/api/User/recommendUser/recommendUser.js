import { prisma } from "../../../../generated/prisma-client";

export default {
    Query:{
        recommendUser: async(_,args)=>{
            return prisma.users({
                first: args.items,
                skip: args.pageNumber,
                orderBy:"followersCount_DESC"
            });
            
          }
        
    }
}

// followersCount: ({ id }) =>
//         prisma
//             .usersConnection({ where: { following_some: { id } } })
//             .aggregate()
//             .count(),