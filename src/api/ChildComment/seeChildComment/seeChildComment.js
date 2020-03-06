import {prisma} from '../../../../generated/prisma-client';

export default {
    Query:{
        seeChildComment: async(_,args)=>{
            
            const {headComment} = args;
            /*const text = await prisma.comment({id});
            const posts = await prisma.user({id}).posts;
            const categories = await prisma.user({id}).category;
            const picks = await prisma.user({id}).picks;*/
            
            return prisma.childComments({
                where:{
                    headComment: {
                        id: headComment
                    }
                },
                orderBy:"createdAt_ASC"
            });
        
        }
    }
}