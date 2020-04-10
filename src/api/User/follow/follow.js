import { isAuthenticated } from "../../../middlewares";
import {prisma} from '../../../../generated/prisma-client';

export default {
    Mutation: {
        follow: async(_,args,{request})=>{
            isAuthenticated(request);
            const {user} = request;  //follow할 상대 ID 
            const {id} = args;
            const token = await prisma.user({id}).notifyToken();

            try{
                await prisma.updateUser({where:{id:user.id}, data:{following:{connect:{id}}}});
                const count = await prisma.usersConnection({where:{following_some:{id}}}).aggregate().count();
                await prisma.updateUser({where:{id:id}, data:{followersCount:count}});
                await prisma.createAlarm({
                    from:{
                        connect: {
                            id: user.id
                        }
                    },
                    to: id,
                    category:"follow",
                    check: false
                });
                if(token){
                    await axios.post("https://exp.host/--/api/v2/push/send",{
                    to : token,
                    title:"ellicous",
                    body: `${user.username}님이 팔로우를 했습니다`
                });
                }
                return true;
            }
            catch (error){
                return false;
            }
        }
    }
}