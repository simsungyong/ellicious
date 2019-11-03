import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        upload: async(_,args, {request})=>{
            isAuthenticated(request);
            const {user} = request;
            const { 
                storeInfo,
                caption,
                files,
                rating,
                category,  //categoryID
                details} = args;
            
            const post = await prisma.createPost({
                caption,
                rating,
                details,
                category:{connect:{id:category}},
                user:{connect:{id:user.id}},
                storeInfo:{connect:{id:storeInfo.id}}
            });

            files.forEach(
                async file => 
                await prisma.createFile({
                    url: file,
                    post:{
                        connect:{
                            id: post.id
                        }
                    }
                })
            );
            return post;
            
        }
    }
}