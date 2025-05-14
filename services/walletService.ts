import { WalletType, ResponseType } from "@/types";
import { uploadFiletoCloudinary } from "./imageService";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "@/config/firebase";

export const createOrUpdateWallet = async (
  walletData: Partial<WalletType>
): Promise<ResponseType> => {
  try {
    let walletTosave = { ...walletData };

    if (walletData?.image) {
      const imageUploadres = await uploadFiletoCloudinary(
        walletData.image,
        "wallets"
      );
      if (!imageUploadres.success) {
        return {
          success: false,
          msg: imageUploadres.msg || "Failed to upload wallet icon",
        };
      }
      walletTosave.image = imageUploadres.data;
    }

    if (!walletData?.id) {
      //new wallet
      walletTosave.amount = 0;
      walletTosave.totalIncome = 0;
      walletTosave.totalExpenses = 0;
      walletTosave.created = new Date();
    }

    const walletRef = walletData?.id
      ? doc(firestore, "wallets", walletData?.id)
      : doc(collection(firestore, "wallets"));
    await setDoc(walletRef, walletTosave, { merge: true }); //updates only the data provided
    return { success: true, data: { ...walletTosave, id: walletRef.id } };
  } catch (error: any) {
    console.log("Error creating or updating wallet:", error);
    return { success: false, msg: error.message };
  }
};
