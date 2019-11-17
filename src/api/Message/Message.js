import { prisma } from "../../../generated/prisma-client";

export default {
    Message: {
        room:({id})=>prisma.message({id}).room()
    }
    
}