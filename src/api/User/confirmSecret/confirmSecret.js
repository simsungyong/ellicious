import {prisma} from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';


export default {
    Mutation:{
        confirmSecret: async(_, args)=>{
            const {account, secret, password} = args;
            const user = await prisma.user({account});
            if(user){
                if(password=== user.password){ //복붙한 secret이랑 디비저장되 loginsecret이랑 비교
                    //await prisma.updateUser({where:{id:user.id}, data:{loginSecret:""}});
                    return generateToken(user.id);
                }
                else {
                    throw Error("비밀번호 오류");
                } 
            }else{
                throw Error("계정 오류")
            }

        }
    }
}