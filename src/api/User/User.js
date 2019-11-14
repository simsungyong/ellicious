import { prisma } from "../../../generated/prisma-client";

export default{
    User : {
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
        following: ({id})=>prisma.user({id}).following(),
        followers: ({id})=>prisma.user({id}).followers()
    }
    
};