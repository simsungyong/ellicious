import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";
import { FULL_POST_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        seeFullPost: async(_, args, {request})=>{
            isAuthenticated(request);
            const {id} = args;

            return prisma.post({id}).$fragment(FULL_POST_FRAGMENT);
        }
    }
}