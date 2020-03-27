import { isAuthenticated } from "../../../middlewares";
import {prisma} from '../../../../generated/prisma-client'

export default {
    Mutation: {
        unfollow: async(_, args, {request})=>{
            isAuthenticated(request);
            const {id} = args;
            const {user} = request;

            try{
                await prisma.updateUser({where: {id: user.id}, data: {following:{disconnect:{id}}}});
                const count = await prisma.usersConnection({where:{following_some:{id}}}).aggregate().count();
                await prisma.updateUser({where:{id:id}, data:{followersCount:count}});
                return true;
            }
            catch (error){
                return false;
            }
        }
    }
}