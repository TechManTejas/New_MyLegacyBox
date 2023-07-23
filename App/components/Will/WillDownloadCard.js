import { View, Text, Pressable, StyleSheet, Linking } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { useGenerateWordFileHashMutation, useGetWillQuery } from "../../services/will/willSlice";
import CustomActivityIndicator from "../Common/CustomActivityIndicator";
import { generateWordFileWillByHashUrl } from "../../services/api/willApiSlice";


const WillDownloadCard = () => {

    const [generateWordFileHash, generateWordFileHashOptions] =
    useGenerateWordFileHashMutation();

  const { data, isLoading, isFetching, isError, error } = useGetWillQuery();

  const {
    theme: { spacing, fontFamily, fontSize, colors },
  } = useTheme();

  const styles = StyleSheet.create({
    card: {
      padding: spacing.lg,
    },
    willHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    buttom: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.blue500,
      borderRadius: 5,
      paddingVertical: 2,
      paddingHorizontal: spacing.sm,
    },
    buttomText: {
      color: colors.white,
      paddingRight: 10,
      paddingTop: 2,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
    },
    section: {
      marginTop: spacing.md,
    },
    sectionTitle: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      marginBottom: spacing.sm,
      paddingBottom: spacing.xs,
    },
    nomineeInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    nomineeName: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
    },
    nomineeEmail: {
      fontFamily: fontFamily.semiBold,
      color: colors.black300,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    distribution: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    percent: {
        fontFamily: fontFamily.semiBold,
        color: colors.black300,
        fontSize: fontSize.md,
        lineHeight: fontSize.default,
    },
    itemTitle: {
        fontFamily: fontFamily.semiBold,
        color: colors.green700
    },
    assetContainer: {
        marginBottom: spacing.md
    },
    testatorName:{
        fontFamily: fontFamily.semiBold,
        fontSize: fontSize.lg,
        lineHeight: fontSize.xl
    },
    date: {
        fontFamily: fontFamily.regular,
        fontSize: fontSize.sm,
        lineHeight: fontSize.md,
        marginTop: spacing.xs
    }
  });

  const generateDownloadLink = async () => {
    try {
      const result = await generateWordFileHash().unwrap();

      if (result.data && result.status === 200) {
        Linking.openURL(
          generateWordFileWillByHashUrl.replace(":hashedWillId", result.data)
        )
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading || isFetching) return <CustomActivityIndicator />;

  if (data?.data !== null && typeof data.data === "object") {
    return (
      <View style={styles.card}>
        <View style={styles.willHeader}>
          <View>
            <Text style={styles.testatorName}>{data.data.personalInfo.fullName}</Text>
            <Text style={styles.date}>
              {new Date(data.data.willDate).toDateString().replace(/^\w+ /, "")}
            </Text>
          </View>
          <Pressable style={styles.buttom} onPress={() => generateDownloadLink()}>
            <Text style={styles.buttomText}>Download</Text>
            <FontAwesome5 name="download" size={10} color="white" />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Beneficiaries</Text>
          <View>
            {data.data.beneficiaries.map((beneficiary, idx) => {
              return (
                <View key={idx} style={styles.nomineeInfo}>
                  <Text style={styles.nomineeName}>{beneficiary.fullName}</Text>
                  <Text style={styles.nomineeEmail}>{beneficiary.email}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Witnesses</Text>
          <View>
            {data.data.witnesses.map((witness, idx) => {
              return (
                <View key={idx} style={styles.nomineeInfo}>
                  <Text style={styles.nomineeName}>{witness.fullName}</Text>
                  <Text style={styles.nomineeEmail}>{witness.email}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executors</Text>
          <View>
            {data.data.executors.map((executor, idx) => {
              return (
                <View key={idx} style={styles.nomineeInfo}>
                  <Text style={styles.nomineeName}>{executor.fullName}</Text>
                  <Text style={styles.nomineeEmail}>{executor.email}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Asset Distribution</Text>
          {data.data.assets.map((asset, idx) => {
            return (
              <View key={idx} style={styles.assetContainer}>
                <Text style={styles.itemTitle}>{asset.itemTitle}</Text>
                <View>
                  {Object.entries(asset.allocations).map(
                    ([_id, percent], idx2) => {
                      return (
                        <View key={idx2} style={styles.distribution}>
                          <Text style={styles.nomineeName}>
                            {
                              data.data.beneficiaries.find(
                                (nominee) => nominee._id === _id
                              ).fullName
                            }
                          </Text>
                          <Text style={styles.percent}>{percent} %</Text>
                        </View>
                      );
                    }
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
};

export default WillDownloadCard;

/*
{
"personalInfo": {
  "_id": "64bbb1a6ec603b1d59ca5131",
  "uid": "d35ed987-ba9d-481c-849d-7700ff9345a6",
  "fullName": "Tanmay Vaij",
  "gender": "MALE",
  "age": 20,
  "dateOfBirth": "2023-07-05T10:38:18.146Z",
  "fathersName": "Sanjay",
  "aadharNumber": "556666222222",
  "address": {
   "pinCode": 445566,
   "city": "Jzf",
   "state": "Jxt",
   "street": "Kx"
  }
 },
 "witnesses": [
  {
   "_id": "64b77a50936887da6d1784a6",
   "gender": "MALE",
   "relationship": "CHILD",
   "fullName": "Parth",
   "phoneNumber": "9988877444",
   "fathersName": "Nandu",
   "age": 24,
   "address": {
    "pinCode": 445667,
    "city": "Rus",
    "state": "F h",
    "street": "Gxk"
   },
   "aadharNumber": "456677771234",
   "email": "parthwani@gmail.com"
  },
  {
   "_id": "64b77ad3458ecb36d8a93da3",
   "gender": "MALE",
   "relationship": "SIBLING",
   "fullName": "Tejas",
   "phoneNumber": "9888765433",
   "age": 24,
   "address": {
    "pinCode": 344556,
    "city": "Yzd",
    "state": "Zfh",
    "street": "Fjx"
   },
   "aadharNumber": "345677731234",
   "fathersName": "Fjz",
   "email": "vaijtejas23@gmail.com"
  }
 ],
 "beneficiaries": [
  {
   "_id": "64b779d4936887da6d1784a3",
   "gender": "MALE",
   "relationship": "OTHER",
   "fullName": "MD Azmal",
   "phoneNumber": "4456700000",
   "address": {
    "pinCode": 766543,
    "city": "Cuttack",
    "state": "Bhubaneswar",
    "street": "Lane 2"
   },
   "fathersName": "MD",
   "age": 25,
   "aadharNumber": "344556677811",
   "email": "test@test.com"
  },
  {
   "_id": "64b779f4936887da6d1784a4",
   "gender": "MALE",
   "relationship": "OTHER",
   "fullName": "MD Azmal three",
   "phoneNumber": "9764387654",
   "fathersName": "MD",
   "age": 25,
   "aadharNumber": "345566778899",
   "address": {
    "pinCode": 345556,
    "city": "Kgx",
    "state": "Zfh",
    "street": "Dit"
   },
   "email": "test2@test.com"
  }
 ],
 "assets": [
  {
   "_id": "6485679b2bda4230509a3add",
   "itemTitle": "ICICI, Bhosari",
   "asset": {
    "_id": "6485679b2bda4230509a3add",
    "address": {
     "pinCode": 412105,
     "city": "Pune",
     "state": "Maharashtra",
     "country": "India",
     "street": "Santanagar, sector 4"
    },
    "ifsc": "ICIC0002125",
    "name": "ICICI",
    "branchName": "Bhosari",
    "pocNumber": "8408882069",
    "poc": "Tanmay Vaij",
    "customerId": "20210801105"
   },
   "rawSection": "Bank",
   "section": "BANK",
   "children": [
    {
     "_id": "649d0d75b4a28a4b7fbcc061",
     "uid": "d35ed987-ba9d-481c-849d-7700ff9345a6",
     "parentId": "6485679b2bda4230509a3add",
     "updatedAt": "2023-06-29T04:49:57.884Z",
     "holdingClass": "ASSET",
     "holdingType": "BANK",
     "holding": {
      "accountType": "FD",
      "ownership": "SINGLE",
      "amount": 20000,
      "accountNumber": "34688998"
     }
    },
    {
     "_id": "649d81db00bac840edd8c270",
     "uid": "d35ed987-ba9d-481c-849d-7700ff9345a6",
     "parentId": "6485679b2bda4230509a3add",
     "updatedAt": "2023-06-29T13:06:35.405Z",
     "holdingClass": "ASSET",
     "holdingType": "BANK",
     "holding": {
      "accountType": "PPF",
      "ownership": "SINGLE",
      "accountNumber": "35689543"
     }
    }
   ],
   "allocations": {
    "64b779f4936887da6d1784a4": 50,
    "64b779d4936887da6d1784a3": 50
   }
  },
  {
   "_id": "649b0cafb9d4293ee5b92a33",
   "itemTitle": "Axis, Kothrud",
   "asset": {
    "_id": "649b0cafb9d4293ee5b92a33",
    "ifsc": "Axis0002204",
    "name": "Axis",
    "branchName": "Kothrud",
    "address": {
     "pinCode": 456899,
     "state": "Maharashtra",
     "country": "India",
     "city": "Pune",
     "street": "Sector 4"
    },
    "customerId": "Axis22334455",
    "poc": "Tanmay Vaij",
    "pocNumber": "8408882079"
   },
   "rawSection": "Bank",
   "section": "BANK",
   "children": [],
   "allocations": {
    "64b779d4936887da6d1784a3": 50,
    "64b779f4936887da6d1784a4": 50
   }
  }
 ],
 "executors": [
  {
   "_id": "64b77a20936887da6d1784a5",
   "gender": "MALE",
   "relationship": "OTHER",
   "fullName": "Yog",
   "phoneNumber": "9877665432",
   "aadharNumber": "345664876567",
   "fathersName": "Father",
   "address": {
    "pinCode": 345674,
    "city": "Ngs",
    "state": "Gns",
    "street": "Vxgm"
   },
   "age": 28,
   "email": "yogmohanty@gmail.com"
  }
 ],
 "declarationInfo": {
  "place": "Dh",
  "declaration": "Yes"
 },
 "willDate": "2023-07-23T05:45:13.501Z"
}

*/
