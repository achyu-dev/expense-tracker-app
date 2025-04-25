import { firestore } from "@/config/firebase";
import { UserDataType, ResponseType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { uploadFiletoCloudinary } from "./imageService";

export const updateUser = async (
  uid: string,
  updatedData: UserDataType
): Promise<ResponseType> => {
  try {
    if (updatedData?.image || updatedData?.image?.uri) {
      const imageUploadres = await uploadFiletoCloudinary(
        updatedData.image,
        "users"
      );
      if (!imageUploadres.success) {
        return {
          success: false,
          msg: imageUploadres.msg || "Failed to upload image",
        };
      }

      updatedData.image = imageUploadres.data;
    }

    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, updatedData);
    return { success: true, msg: "User data updated successfully" };
  } catch (error: any) {
    console.error("Error updating user data:", error);
    return { success: false, msg: "Failed to update user data" };
  }
};
