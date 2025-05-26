import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useAuth } from "@/contexts/authContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import { verticalScale } from "@/utils/styling";

const Home = () => {
  const { user } = useAuth();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        {/*03:40:00 */}
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollViewStyle: {
    marginTop: spacingY._10,
    paddingBottom: verticalScale(100),
    gap: spacingY._25,
  },

  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: "absolute",
    bottom: verticalScale(30),
    right: verticalScale(30),
  },

  searchIcon: {
    backgroundColor: colors.neutral700,
    padding: spacingX._10,
    borderRadius: 20,
  },

  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    marginTop: verticalScale(8),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacingY._10,
  },
});
