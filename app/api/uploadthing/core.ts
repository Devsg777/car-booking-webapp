import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 

export const ourFileRouter = {

  imageUploader: f({ image: { maxFileSize: "8MB",maxFileCount:1 } })
    // Set permissions and file types for this FileRoute
    // .middleware(async ({ req }) => {
    //   // This code runs on your server before upload
    //   const {userId} = auth()
 
    //   if (!userId) throw new UploadThingError("Unauthorized");
 
    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { userId };
    // })
    .onUploadComplete(async ({ metadata, file }) => {

      console.log("Upload complete for userId:");
      console.log("file url", file.url);
      return { uploadedBy: "admin" };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;