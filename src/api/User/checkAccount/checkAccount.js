import {prisma} from '../../../../generated/prisma-client';

export default {
    Query: {
      checkAccount: async (_, args) => {
        const { account } = args;
        const user = await prisma.user({account});
        if(user){
            return true;
        }else{
            return false;
        }
      }
    }
}