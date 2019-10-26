import { prisma } from "../../../generated/prisma-client";

export default {
     Post: {
         isLiked: async(parent, _ , {request})=>{
             const {user} = request;
             const {id} = parent;

             return prisma.$exists.like({
                 AND: [
                     {
                         user:{
                             id:user.id
                         }
                     },
                     {
                         post:{
                             id
                         }}
                 ]
             });
         },
         likeCount: (parent)=>prisma.likesConnection({where:{post:{id:parent.id}}}).aggregate().count(),//좋아요 연결
         isPicked: async(parent, _ , {request})=>{
            const {user} = request;
            const {id} = parent;
            return prisma.$exists.pick({
                AND: [
                    {
                        user:{
                            id:user.id
                        }
                    },
                    {
                        post:{
                            id
                        }
                    }
                ]
            });
            
         }


     }
}