import {prisma} from '../../../../generated/prisma-client';

export default{
    Mutation:{
        createAccount: async(_, args)=>{
            const { phoneNum, password, username, email, firstName= "", lastName="", bio=""} = args;
            const exists = await prisma.$exists.user({
                OR: [
                    {
                    username
                    },
                    {
                        email
                    },
                    {
                        phoneNum
                    }
                ]
            });
            if(exists){
                throw Error("아이디나, 이메일, 휴대폰 번호가 겹칩니다.");
            }
            try {
                await prisma.createUser({
                    username,
                    email,
                    firstName,
                    lastName,
                    bio,
                    password,
                    phoneNum
                });
                return true;
                
            } catch (error) {
                return false;
            }
        }
    }
}