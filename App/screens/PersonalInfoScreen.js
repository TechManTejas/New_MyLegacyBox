import { View, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../theme/ThemeProvider"; 
import { useSelector } from "react-redux";
import { getPersonalInfoSelector } from "../services/willForm/willFormSlice"; 
import PersonalInfoForm from "../components/Common/PersonalInfoForm"; 
import { useGetPersonalInfoQuery } from "../services/personalInfo/personalInfoSlice";
import CustomActivityIndicator from "../components/Common/CustomActivityIndicator";

const PersonalInfoScreen = () => {

  const {data, isLoading, isFetching } = useGetPersonalInfoQuery()

  const {
    theme: { colors },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
  });

  if ( isFetching || isLoading ) return <CustomActivityIndicator/>

  return (
    <View style={styles.container}>
      <PersonalInfoForm initialValues={data.data} />
    </View>
  );
};

export default PersonalInfoScreen;
