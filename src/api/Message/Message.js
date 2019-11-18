import { prisma } from "../../../generated/prisma-client";

export default {
    Message: {
        room:({id})=>prisma.message({id}).room(),
        from:({id})=>prisma.message({id}).from(),
        to:({id})=>prisma.message({id}).to()
    }
    
}