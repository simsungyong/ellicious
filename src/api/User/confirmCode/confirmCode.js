import {prisma} from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';


export default {
    Mutation:{
        confirmCode: async(_, args)=>{
            const {secretNum, phoneNum} = args;
            const user = await prisma.user({phoneNum});
            if(user){
                if(secretNum=== user.loginSecret){ //복붙한 secret이랑 디비저장되 loginsecret이랑 비교
                    await prisma.updateUser({where:{phoneNum:user.phoneNum}, data:{loginSecret:""}});
                    return true
                }
                else {
                    return false
                } 
            }else{
                throw Error("계정 오류")
            }

        }
    }
}