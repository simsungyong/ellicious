import { prisma } from "../../../generated/prisma-client";
export default {
    Alarm: {
        from:({id})=> prisma.alarm({id}).user(),
        post:({id})=> prisma.alarm({id}).post(),

    }
}