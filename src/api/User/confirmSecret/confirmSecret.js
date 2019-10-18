import {prisma} from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';


export default {
    Mutation:{
        confirmSecret: async(_, args)=>{
            const {email, secret} = args;
            const user = await prisma.user({email});
            if(secret=== user.loginSecret){ //복붙한 secret이랑 디비저장되 loginsecret이랑 비교
                await prisma.updateUser({where:{id:user.id}, data:{loginSecret:""}});
                return generateToken(user.id);
            }
            else {
                throw Error("잘못된 시크릿 코드 입니다. 다시 확인해 주세요");
            }
        }
    }
}