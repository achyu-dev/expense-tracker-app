import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import { ImageBackground } from "expo-image";
import * as Icons from "phosphor-react-native";
import { useAuth } from "@/contexts/authContext";
import useFetchdata from "@/hooks/useFetchdata";
import { WalletType } from "@/types";
import { orderBy, where } from "firebase/firestore";

const HomeCard = () => {
  const { user } = useAuth();

  const {
    data: wallets,
    error,
    loading: walletLoading,
  } = useFetchdata<WalletType>("wallets", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);

  const getTotalBalance = () => {
    return wallets.reduce(
      (totals: any, items: WalletType) => {
        totals.balance = totals.balance + Number(items.amount);
        totals.income = totals.income + Number(items.totalIncome);
        totals.expense = totals.expense + Number(items.totalExpenses);
        return totals;
      },
      { balance: 0, income: 0, expense: 0 }
    );
    
  }

  return (
    <ImageBackground
      source={require("@/assets/images/card.png")}
      style={styles.bgImage}
      contentFit="fill"
    >
      <View style={styles.container}>
        <View>
          <View style={styles.totalBalanceRow}>
            <Typo color={colors.neutral800} size={17} fontWeight={"500"}>
              Total Balance
            </Typo>
            <Icons.DotsThreeOutline
              size={verticalScale(23)}
              color={colors.black}
              weight="fill"
            />
          </View>
          <Typo color={colors.black} size={32} fontWeight={"bold"}>
            ₹ {walletLoading ? "---" : getTotalBalance()?.balance?.toFixed(2)}
          </Typo>
        </View>

        {/* Income and Expenses */}
        <View style={styles.stats}>
          {/* Income */}
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.incomeExpenses}>
              <View style={styles.statsIcon}>
                <Icons.ArrowDown
                  size={verticalScale(15)}
                  color={colors.black}
                  weight="bold"
                />
              </View>
              <Typo size={16} color={colors.neutral700} fontWeight={"500"}>
                Income
              </Typo>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Typo size={17} color={colors.green} fontWeight={"600"}>
                ₹ {walletLoading ? "---" : getTotalBalance()?.income?.toFixed(2)}
              </Typo>
            </View>
          </View>

          {/* Expenses */}
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.incomeExpenses}>
              <View style={styles.statsIcon}>
                <Icons.ArrowUp
                  size={verticalScale(15)}
                  color={colors.black}
                  weight="bold"
                />
              </View>
              <Typo size={16} color={colors.neutral700} fontWeight={"500"}>
                Expense
              </Typo>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Typo size={17} color={colors.rose} fontWeight={"600"}>
                ₹ {walletLoading ? "---" : getTotalBalance()?.expense?.toFixed(2)}
              </Typo>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  incomeExpenses: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingY._7,
  },

  statsIcon: {
    backgroundColor: colors.neutral350,
    padding: spacingY._5,
    borderRadius: 50,
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalBalanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  container: {
    padding: spacingX._20,
    paddingHorizontal: scale(23),
    height: "87%",
    width: "100%",
    justifyContent: "space-between",
  },

  bgImage: {
    height: scale(210),
    width: "100%",
  },
});
