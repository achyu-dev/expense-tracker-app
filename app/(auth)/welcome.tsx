import {
  Image,
  Platform,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { ContactlessPayment } from "phosphor-react-native";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { Shadow } from "react-native-shadow-2";

const Welcome = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Login button and image */}
        <View>
          <TouchableOpacity style={styles.loginButton}>
            <Typo fontWeight={"500"}>Sign In</Typo>
          </TouchableOpacity>

          <Image
            source={require("@/assets/images/welcome.png")}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
        </View>

        {/* Footer */}

        <View style={[styles.footer, styles.shadow]}>
          <View style={{ alignItems: "center" }}>
            <Typo size={30} fontWeight={"800"}>
              Always Take Control
            </Typo>
            <Typo size={30} fontWeight={"800"}>
              Of Your Money
            </Typo>
          </View>
          <View style={{alignItems: "center", gap: 2}}>
          <Typo size={17} color={colors.textLight}>
              Money for a better
            </Typo>
            <Typo size={17} color={colors.textLight}>
              lifestyle in the future
            </Typo>
          </View>

          <View style={styles.buttonContainer}></View>
            {/* Button */}

        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._7,
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(300),
    alignSelf: "center",
  },

  loginButton: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },

  footer: {
    width: "100%",
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  shadow:
    Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 10,
      },
    }) ?? {},

  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
