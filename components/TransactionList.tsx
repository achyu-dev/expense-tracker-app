import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TransactionListType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Typo from "./Typo";
import { FlashList } from "@shopify/flash-list";

const TransactionList = ({
  data,
  title,
  loading,
  emptyListMessage,
}: TransactionListType) => {
  return (
    <View style={styles.container}>
      {title && (
        <Typo size={20} fontWeight={"500"}>
          {title}
        </Typo>
      )}

      <View style={styles.list}>
        <FlashList
          data={[1, 2, 4]}
          renderItem={({ item, index }) => (
            <TransactionItem item={item} index={index} />
          )}
          estimatedItemSize={60}
        />
      </View>
    </View>
  );
};

const TransactionItem = () => {
  return (
    <View style={styles.row}>
      <Typo>Transaction Item</Typo>
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  icon: {
    height: verticalScale(44),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius._12,
    borderCurve: "continuous",
  },

  categoryDes: {
    flex: 1,
    gap: 2.5,
  },

  amountDate: {
    alignItems: "flex-end",
    gap: 3,
  },

  container: {
    gap: spacingY._17,
  },

  list: {
    minHeight: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacingY._10,
    gap: spacingX._12,
    marginBottom: spacingY._12,
    backgroundColor: colors.neutral800,
    padding: spacingY._10,
    borderRadius: radius._17,
  },
});
