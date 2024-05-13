import React from "react";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { useTheme } from "../../../../testApp/theme/ThemeProvider";
import CustomHeaderLeftIcon from "../../../../testApp/components/Common/CustomHeaderLeftIcon";
import CustomHeaderTitle from "../../../../testApp/components/Common/CustomHeaderTitle";
import PensionBoxHeader from "../../../../testApp/components/Home/PensionBoxHeader";
import { REAL_ESTATE_TYPE_TO_TITLE_MAP } from "../../../../testApp/constants/financialHoldings/realEstateHolding";

const HomeLayout = () => {
  const {
    theme: { colors },
  } = useTheme();

  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: colors.blue100,
    },
  });

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerLeft: () => <CustomHeaderLeftIcon />,
        headerTitleAlign: "center",
        headerTitle: (props) => <CustomHeaderTitle {...props} />,
        headerBackVisible: false,
      }}
    >
      {/* Other routes */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="faq" options={{ title: "FAQs" }} />
      <Stack.Screen name="appTour" options={{ title: "App Tours" }} />
      <Stack.Screen name="archived" options={{ title: "Archived Assets" }} />
      <Stack.Screen name="nominatorsList" options={{ title: "Shared" }} />
      <Stack.Screen
        name="sharedArtifacts"
        options={{ title: "Shared Artifacts" }}
      />
      <Stack.Screen
        name="pensionboxiframe"
        options={{
          headerShown: true,
          header: PensionBoxHeader,
        }}
      />

      {/* Bank routes */}
      <Stack.Screen name="bank/addbank" options={{ title: "Add Bank" }} />
      <Stack.Screen
        name="bank/addbankholding"
        options={({ route }) => ({
          title: `Add holding for ${route.params.title}`,
        })}
      />
      <Stack.Screen name="bank/banklist" options={{ title: "Banks" }} />
      <Stack.Screen
        name="bank/banks"
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen name="bank/updatebank" options={{ title: "Edit Bank" }} />
      <Stack.Screen
        name="bank/updatebankholding"
        options={{ title: "Update Account Details" }}
      />

      {/* Cash routes */}
      <Stack.Screen
        name="cash/addcashholding"
        options={{ title: "Add Holding for Cash" }}
      />
      <Stack.Screen name="cash/cash" options={{ title: "Cash" }} />
      <Stack.Screen
        name="cash/updatecashholding"
        options={{ title: "Update cash holding" }}
      />

      {/* Insurance routes */}
      <Stack.Screen
        name="insurance/addinsurance"
        options={{ title: "Add Insurer" }}
      />
      <Stack.Screen
        name="insurance/addinsuranceholding"
        options={({ route }) => ({
          title: `Add for ${route.params.title}`,
        })}
      />
      <Stack.Screen
        name="insurance/insurancelist"
        options={{ title: "Insurances" }}
      />
      <Stack.Screen
        name="insurance/insurances"
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="insurance/updateinsurance"
        options={{ title: "Edit Insurer" }}
      />
      <Stack.Screen
        name="insurance/updateinsuranceholding"
        options={{ title: "Update Policy Details" }}
      />

      {/* Provident fund routes */}
      <Stack.Screen
        name="pf/addpfholding"
        options={{ title: "Add PF holding" }}
      />
      <Stack.Screen name="pf/pfs" options={{ title: "Provident Fund" }} />
      <Stack.Screen
        name="pf/updatepfholding"
        options={{ title: "Update PF Account" }}
      />

      {/* Postal routes */}
      <Stack.Screen name="postal/addpostal" options={{ title: "Add Postal" }} />
      <Stack.Screen
        name="postal/addpostalholding"
        options={({ route }) => ({
          title: `Add Account for ${route.params.title}`,
        })}
      />
      <Stack.Screen
        name="postal/postallist"
        options={{ title: "Post Office" }}
      />
      <Stack.Screen
        name="postal/postals"
        options={({ route }) => ({
          title: `Post office, ${route.params.title}`,
        })}
      />
      <Stack.Screen
        name="postal/updatepostal"
        options={{ title: "Edit Postal" }}
      />
      <Stack.Screen
        name="postal/updatepostalholding"
        options={{ title: "Update Account Details" }}
      />

      {/* Real estate routes */}
      <Stack.Screen
        name="realestate/addrealestateholding"
        options={({ route }) => ({
          title: `Add ${
            REAL_ESTATE_TYPE_TO_TITLE_MAP[route.params.realEstateType]
          } Details`,
        })}
      />
      <Stack.Screen
        name="realestate/realestatelist"
        options={{ title: "Real Estate" }}
      />
      <Stack.Screen
        name="realestate/realestates"
        options={({ route }) => ({
          title: REAL_ESTATE_TYPE_TO_TITLE_MAP[route.params.realEstateType],
        })}
      />
      <Stack.Screen
        name="realestate/updaterealestateholding"
        options={{ title: "Update Real estate holding" }}
      />

      {/* Shares and securities routes */}
      <Stack.Screen
        name="shares/addcompanyholding"
        options={{ title: "Add Private Limited Holding" }}
      />
      <Stack.Screen
        name="shares/adddematholding"
        options={{ title: "Add Demat Holding" }}
      />
      <Stack.Screen
        name="shares/addpartnershipholding"
        options={{ title: "Add Partnership Holding" }}
      />
      <Stack.Screen
        name="shares/addproprietorshipholding"
        options={{ title: "Add Proprietorship Holding" }}
      />
      <Stack.Screen
        name="shares/companies"
        options={{ title: "Private Limited Company" }}
      />
      <Stack.Screen name="shares/demats" options={{ title: "Demat" }} />
      <Stack.Screen
        name="shares/partnerships"
        options={{ title: "Partnership" }}
      />
      <Stack.Screen
        name="shares/proprietorships"
        options={{ title: "Proprietorship" }}
      />
      <Stack.Screen
        name="shares/shareslist"
        options={{ title: "Share & Securities" }}
      />
      <Stack.Screen
        name="shares/updatecompanyholding"
        options={{ title: "Update Private Limited holding" }}
      />
      <Stack.Screen
        name="shares/updatedematholding"
        options={{ title: "Update Demat holding" }}
      />
      <Stack.Screen
        name="shares/updatepartnershipholding"
        options={{ title: "Update Partnership holding" }}
      />
      <Stack.Screen
        name="shares/updateproprietorshipholding"
        options={{ title: "Update Proprietorship holding" }}
      />
    </Stack>
  );
};

export default HomeLayout;
