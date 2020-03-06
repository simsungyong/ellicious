import { prisma } from "../../../generated/prisma-client";

export default {
    ChildComment: {
        user: ({id})=> prisma.childComment({id}).user(),
        //likes: ({id})=>prisma.comment({id}).likes(),
        //post: ({id})=> prisma.comment({id}).post(),
        // childCount: ({id}) =>
        // prisma
        //     .childCommentsConnection({
        //     where: { headComment: { id: id } }
        //     })
        //     .aggregate()
        //     .count()
        
        /*likeCount: ({id})=>prisma.likesConnection({where:{comment:{id:comment.id}}}).aggregate().count(),//좋아요 연결
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
                        comment:{
                            id
                        }}
                ]
            });
        },
    }*/
}
}