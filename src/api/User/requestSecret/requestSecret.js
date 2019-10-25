import {prisma} from '../../../../generated/prisma-client';
import {generateSecretCode, sendMail, sendSecretMail} from '../../../utils';

export default {
    Mutation:{
        requestSecret: async(_, args, {request})=>{
            console.log(request.user);
            const {email} = args;
            const loginSecret = generateSecretCode();   //secret code 생성  utils에 명시해놈.
            
            try{
                await sendSecretMail(email, loginSecret);
                await prisma.updateUser({data:{loginSecret}, where:{email}});
                return true;
            }catch(error){
                console.log(error);
                return false;
            }
        }
    }
}