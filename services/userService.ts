import { firestore } from "@/config/firebase";
import { UserDataType, ResponseType} from "@/types";
import { doc, updateDoc } from "firebase/firestore";

export const updateUser = async (uid: string, 
    updatedData: UserDataType): Promise<ResponseType> => {
        try{
            // image is not updated here, only name is updated
            const userRef = doc(firestore, "users", uid);
            await updateDoc(userRef, updatedData);
            return { success: true, msg: "User data updated successfully" };
        } catch (error:any) {
            console.error("Error updating user data:", error);
            return { success: false, msg: "Failed to update user data" };
        }
    }