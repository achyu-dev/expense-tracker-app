import { firestore } from "@/config/firebase";
import { ResponseType, TransactionType, WalletType } from "@/types";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { uploadFiletoCloudinary } from "./imageService";

export const createOrUpdatetransaction = async (
  trasnactionData: Partial<TransactionType>
): Promise<ResponseType> => {
  try {
    const { id, type, walletId, amount, image } = trasnactionData;
    if (!amount || amount <= 0 || !walletId || !type) {
      return { success: false, msg: "Invalid Amount Entered" };
    }

    if (id) {
      // todo: Update existing transaction
    } else {
      // update wallet for new transaction
      let res = await updateWalletForNewTransaction(
        walletId!,
        Number(amount!),
        type
      );
      if (!res.success) {
        return res;
      }
    }

    if (image) {
      const imageUploadres = await uploadFiletoCloudinary(
        image,
        "transactions"
      );
      if (!imageUploadres.success) {
        return {
          success: false,
          msg: imageUploadres.msg || "Failed to upload receipt",
        };
      }

      trasnactionData.image = imageUploadres.data;
    }

    const transactionRef = id
      ? doc(firestore, "transactions", id)
      : doc(collection(firestore, "transactions"));

    await setDoc(transactionRef, trasnactionData, { merge: true });

    return {
      success: true,
      data: { ...trasnactionData, id: transactionRef.id },
    };
  } catch (error: any) {
    console.log("Error creating or updating transaction:", error);
    return { success: false, msg: error.message };
  }
};

const updateWalletForNewTransaction = async (
  walletId: string,
  amount: number,
  type: string
) => {
  try {
    const walletRef = doc(firestore, "wallets", walletId);
    // Fetch current wallet data
    const walletSnap = await getDoc(walletRef);
    if (!walletSnap.exists()) {
      console.log("Error updating wallet for new transaction:");
      return { success: false, msg: "Wallet not found" };
    }

    const walletData = walletSnap.data() as WalletType;

    if (type === "expense" && walletData.amount! - amount < 0) {
      return { success: false, msg: "Insufficient funds in wallet" };
    }

    const updatedType = type == "income" ? "totalIncome" : "totalExpenses";
    const updatedAmount =
      type == "income"
        ? Number(walletData.amount!) + amount
        : Number(walletData.amount!) - amount;

    const updatedTotals =
      type == "income"
        ? Number(walletData.totalIncome) + amount
        : Number(walletData.totalExpenses) + amount;

    await updateDoc(walletRef, {
      amount: updatedAmount,
      [updatedType]: updatedTotals,
    });
    return { success: true };
  } catch (error: any) {
    console.log("Error updating wallet for new transaction:", error);
    return { success: false, msg: error.message };
  }
};
