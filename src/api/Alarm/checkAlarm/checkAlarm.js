import {prisma} from '../../../../generated/prisma-client';

export default {
    Mutation: {
        checkAlarm: async(_,args, {request})=>{
            const { alarmId, check } = args;

            return prisma.updateAlarm({
                where:{
                    id:alarmId
                },
                data:{check}
            });
        }
    }
}