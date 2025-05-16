import { generateReactHelpers } from "@uploadthing/react";
import { uploadRouter } from "@/app/api/uploadthing/route";

export const { useUploadThing } = generateReactHelpers();