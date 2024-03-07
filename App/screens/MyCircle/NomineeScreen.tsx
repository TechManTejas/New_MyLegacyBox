import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import CustomActivityIndicator from "../../components/Common/CustomActivityIndicator";
import BlueButton from "../../components/Common/Button/BlueButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Empty from "../../components/Common/Empty";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screenNames";
import { useGetNomineesQuery } from "../../redux/api/nominee/nomineeSlice";
import { NOMINEE_RELATIONSHIP_TO_TITLE_MAP } from "../../constants/nominee";
import NomineeScreenCard from "../../components/Nominee/NomineeScreenCard";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { useAuth } from "../../authentication/AuthProvider";
import { setShowMyCircleTourModal } from "../../redux/appTour/appTour";
import Bugsnag from "@bugsnag/expo";

const NomineeScreen = () => {
  const dispatch = useDispatch();

  const { session } = useAuth();

  useEffect(() => {
    getItemAsync(`MyCircleTourShown-${session?.identity.id}`)
      .then((res) => {
        if (res !== "true") {
          dispatch(setShowMyCircleTourModal(true));
          setItemAsync(`MyCircleTourShown-${session?.identity.id}`, "true").then(() => {})
          .catch((err) => {
            console.error(err);
          });
        }
      })
      .catch((err) => {
        Bugsnag.notify(err);

        deleteItemAsync(`MyCircleTourShown-${session?.identity.id}`)
          .then(() => {})
          .catch((err) => {
            console.error(err);
          });
      });
  }, []);

  const navigation = useNavigation();

  const { data, isLoading, isFetching } = useGetNomineesQuery();

  const {
    theme: { spacing, colors },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.addNomineeScreen);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
    listContainer: {
      flex: 1,
      paddingTop: spacing.lg,
    },
    listHeader: {
      paddingTop: spacing.lg,
    },
    listContentContainer: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
    },
    footer: {
      paddingVertical: spacing.md,
      paddingBottom: spacing.lg,
      paddingHorizontal: spacing.lg,
    },
  });

  if (isLoading || isFetching) return <CustomActivityIndicator />;

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={
            data !== undefined ? data.ids.map((id) => data.entities[id]) : []
          }
          renderItem={({ item }) => {
            return (
              <NomineeScreenCard
                age={item.age}
                nomineeScreen={true}
                title={item.fullName}
                holdingClass={
                  NOMINEE_RELATIONSHIP_TO_TITLE_MAP[item.relationship]
                }
                content={[
                  { key: "Phone Number", value: item.phoneNumber },
                  { key: "Email", value: item.email || "Not Available" },
                  {
                    key: "Address",
                    value: item.address
                      ? `${item.address.street},\n ${item.address.city}, ${item.address.state}, ${item.address.pinCode}`
                      : "Not Available",
                  },
                ]}
                openButtonCallBack={() => {
                  navigation.navigate("ASSETS_WITH_NOMINEE_SCREEN", {
                    nominee: item.fullName,
                    nomineeEmail: item.email,
                  });
                }}
                editButtonCallBack={() => {
                  navigation.navigate(SCREEN_NAMES.updateNomineeScreen, {
                    nominee: item,
                  });
                }}
              />
            );
          }}
          keyExtractor={({ _id }) => _id}
          ListEmptyComponent={() => <Empty message="No holdings available" />}
        />
      </View>
      <View style={styles.footer}>
        <BlueButton
          outline
          Icon={FontAwesome5}
          iconName="plus"
          title="Add"
          onPress={pressHandler}
        />
      </View>
    </View>
  );
};

export default NomineeScreen;
