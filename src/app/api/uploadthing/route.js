import { createRouteHandler, createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({ image: { maxFileSize: "1024MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload complete:", file.ufsUrl);
    }),
};

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
});