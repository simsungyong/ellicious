import { prisma } from "../../../../generated/prisma-client";
import {isAuthenticated} from '../../../middlewares';


export default {
    Query:{
        searchUser: async(_,__,{request})=>{
            isAuthenticated(request);
            const {user} = request;
            return prisma.alarms({
                where:{
                    to: user.id
                }
            })
        }
    }
}