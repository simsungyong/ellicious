import { prisma } from "../../../generated/prisma-client";

export default{
    User : {
        rooms: ({id})=>prisma.user({id}).rooms(),
        postsCount: ({ id }) => prisma.postsConnection({ where: { user: { id } } }).aggregate().count(),
        followingCount: ({ id }) =>
        prisma
            .usersConnection({ where: { followers_some: { id } } })
            .aggregate()
            .count(),
        followersCount: ({ id }) =>
        prisma
            .usersConnection({ where: { following_none: { id } } })
            .aggregate()
            .count(),
        fullName: parent=>{
            return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: async(parent,_,{request})=>{  //(parent, arg, request)
            const { user } = request;
            const { id: parentId} = parent;
            try{
                return prisma.$exists.user({
                    AND: [
                        {
                            id:parentId
                        },
                        {
                            followers_some:{
                                id: user.id
                            }
                        }
                ] //parentId 는 요청한 유저, user.id는 본인
                });
            }catch (error){
                console.log(error);
                return false;
            }
     
        },
        isSelf: (parent, _,{request})=>{
            const { user } = request;
            const { id: parentId} = parent;
            return user.id === parentId;
        },
        posts: ({id})=>prisma.user({id}).posts(),
        following: ({id})=>prisma.user({id}).users(),
        followers: ({id})=>prisma.user({id}).users(),
        category:({id})=>prisma.user({id}).categories(),
        /*categoryCount: ({id})=>prisma
            .usersConnection({where:{category_some}})*/

    }
    
};