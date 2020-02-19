import {prisma} from '../../../../generated/prisma-client';
import {generateSecretCode, sendSecretSMS, sendSMS} from '../../../utils';

export default {
    Mutation:{
        requestSecret: async(_, args, {request})=>{
            const {phoneNum} = args;
            const secretNumber = generateSecretCode();   //secret code 생성  utils에 명시해놈.
            console.log(secretNumber)
            try{
                await sendSecretSMS(phoneNum, secretNumber);
                await prisma.updateUser({data:{loginSecret:secretNumber}, where:{phoneNum}});
                return true;
            }catch(error){
                console.log(error);
                return false;
            }
        }
    }
}