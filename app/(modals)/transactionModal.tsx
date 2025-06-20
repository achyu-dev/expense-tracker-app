import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import ScreenWrapper from "@/components/ScreenWrapper";
import ModalWrapper from "@/components/ModalWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { Image } from "expo-image";
import { getProfileImage } from "@/services/imageService";
import * as Icons from "phosphor-react-native";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import { TransactionType, UserDataType } from "@/types";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/authContext";
import { updateUser } from "@/services/userService";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import ImageUpload from "@/components/imageUpload";
//import { createOrUpdatetransaction, deletetransaction } from "@/services/transactionService";
import { Dropdown } from "react-native-element-dropdown";
import { transactionTypes } from "@/constants/data";
import { deleteWallet } from "@/services/walletService";

const TransactionModal = () => {
  const { user, updateUserData } = useAuth();
  const [transaction, settransaction] = useState<TransactionType>({
    type: "expense",
    amount: 0,
    description: "",
    date: new Date(),
    category: "",
    walletId: "",
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const oldTransaction: { name: string; image: string; id: string } =
    useLocalSearchParams();
  console.log("oldTransaction", oldTransaction);

  // useEffect(() => {
  //   if (oldTransaction?.id) {
  //     settransaction({
  //       name: oldTransaction?.name,
  //       image: oldTransaction?.image,
  //     });
  //   }
  // }, []);

  const onSubmit = async () => {
    // let { name, image } = transaction;
    // if (!name.trim() || !image) {
    //   Alert.alert("transaction", "Please fill all the fields");
    //   return;
    // }
    // const data: transactionType = {
    //   name,
    //   image,
    //   uid: user?.uid,
    // };
    // //include transaction if updating
    // if (oldTransaction?.id) {
    //   data.id = oldTransaction?.id;
    // }
    // setIsLoading(true);
    // const res = await createOrUpdatetransaction(data);
    // setIsLoading(false);
    // console.log("result", res);
    // if (res.success) {
    //   //updateUserData(user?.uid as string);
    //   router.back();
    // } else {
    //   Alert.alert("transaction", res.msg);
    // }
  };

  const onDelete = async () => {
    console.log("Delete transaction pressed", oldTransaction?.id);
    if (!oldTransaction?.id) {
      //Alert.alert("Error", "No transaction to delete");
      return;
    }
    setIsLoading(true);
    const res = await deleteWallet(oldTransaction?.id);
    setIsLoading(false);
    if (res.success) {
      router.back();
    } else {
      Alert.alert("Error", res.msg);
    }
  };

  const showDeleteAlert = () => {
    Alert.alert(
      "Delete transaction",
      "Are you sure you want to delete this transaction? \n This action will delete all transactions related to this transaction.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Delete"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => console.log("Delete pressed"),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={oldTransaction?.id ? "Updated transaction" : "New transaction"}
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        {/* form */}
        <ScrollView
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Type</Typo>
            {/* Dropdown for transaction type */}
            <Dropdown
              style={styles.dropdwownContainer}
              activeColor={colors.neutral700}
              placeholderStyle={styles.dropDownPlaceholder}
              selectedTextStyle={styles.dropdownselectedtext}
              iconStyle={styles.dropdownIcon}
              data={transactionTypes}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={transaction.type}
              itemTextStyle={styles.dropdownitemtext}
              itemContainerStyle={styles.dropDownitemcontainer}
              containerStyle={styles.dropdownlistcontainer}
              //placeholder={!isFocus ? "Select type" : "..."}
              onChange={(item) => {
                settransaction({ ...transaction, type: item.value });
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>transaction Icon</Typo>
            <ImageUpload
              file={transaction.image}
              onSelect={(file) =>
                settransaction({ ...transaction, image: file })
              }
              placeholder="Upload Image"
              onClear={() => settransaction({ ...transaction, image: null })}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        {oldTransaction?.id && !isLoading && (
          <Button
            onPress={showDeleteAlert}
            style={{
              backgroundColor: colors.rose,
              paddingHorizontal: spacingX._15,
            }}
          >
            <Icons.Trash
              weight="bold"
              color={colors.white}
              size={verticalScale(24)}
            />
          </Button>
        )}
        <Button onPress={onSubmit} style={{ flex: 1 }} loading={isLoading}>
          <Typo color={colors.black} fontWeight={"700"}>
            {oldTransaction?.id ? "Update transaction" : "Add transaction"}
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default TransactionModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingY._20,
  },

  form: {
    gap: spacingY._20,
    paddingVertical: spacingY._15,
    paddingHorizontal: spacingY._40,
  },

  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingY._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._5,
  },

  dateInput: {
    flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
  },

  datePickerButton: {
    backgroundColor: colors.neutral700,
    alignSelf: "flex-end",
    padding: spacingX._7,
    paddingHorizontal: spacingY._15,
    borderRadius: radius._10,
  },

  dropdwownContainer: {
    height: verticalScale(54),
    borderWidth: 1,
    borderColor: colors.neutral300,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._15,
    borderCurve: "continuous",
  },

  dropdowntext: { color: colors.white },

  dropdownselectedtext: {
    color: colors.white,
    fontSize: verticalScale(14),
  },

  dropdownlistcontainer: {
    backgroundColor: colors.neutral900,
    borderRadius: radius._15,
    borderCurve: "continuous",
    paddingVertical: spacingY._7,
    top: 5,
    borderColor: colors.neutral500,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },

  dropDownPlaceholder: {
    color: colors.white,
  },

  dropdownitemtext: {
    color: colors.white,
  },

  dropDownitemcontainer: {
    borderRadius: radius._15,
    marginHorizontal: spacingX._7,
  },

  dropdownIcon: {
    height: verticalScale(30),
    tintColor: colors.neutral300,
  },

  inputContainer: {
    gap: spacingY._10,
  },
});
