import { prisma } from "../../../generated/prisma-client";

export default {
     Post: {
        likeCount: (parent)=>prisma.likesConnection({where:{post:{id:parent.id}}}).aggregate().count(),//좋아요 연결
        pickCount: (parent)=>prisma.picksConnection({where:{post:{id:parent.id}}}).aggregate().count(), //콕집기 개수
        files: ({id})=> prisma.post({id}).files(),
        comments: ({id})=> prisma.post({ id}).comments(),
        user: ({id})=> prisma.post({id}).user(),
        storeInfo: ({id})=> prisma.post({id}).storeInfo(),
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