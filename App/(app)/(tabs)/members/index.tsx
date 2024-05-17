import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../../../../testApp/theme/ThemeProvider";
import CustomActivityIndicator from "../../../../testApp/components/Common/CustomActivityIndicator";
import BlueButton from "../../../../testApp/components/Common/Button/BlueButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Empty from "../../../../testApp/components/Common/Empty";
import { useGetNomineesQuery } from "../../../../testApp/redux/api/nominee/nomineeSlice";
import { NOMINEE_RELATIONSHIP_TO_TITLE_MAP } from "../../../../testApp/constants/nominee";
import NomineeScreenCard from "../../../../testApp/components/Nominee/NomineeScreenCard";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { useAuth } from "../../../../testApp/authentication/AuthProvider";
import { setShowMyCircleTourModal } from "../../../../testApp/redux/appTour/appTour";
import Bugsnag from "@bugsnag/expo";
import { useRouter } from "expo-router";

const Members = () => {
  const dispatch = useDispatch();

  const { session } = useAuth();

  useEffect(() => {
    getItemAsync(`MyCircleTourShown-${session?.identity.id}`)
      .then((res) => {
        if (res !== "true") {
          dispatch(setShowMyCircleTourModal(true));
          setItemAsync(`MyCircleTourShown-${session?.identity.id}`, "true")
            .then(() => {})
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

  const router = useRouter();

  const { data, isLoading, isFetching } = useGetNomineesQuery();

  const {
    theme: { spacing, colors },
  } = useTheme();

  const pressHandler = () => {
    router.push("/members/addNominee");
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
                  router.push({
                    pathname: "/members/assetsWithNominee",
                    params: {
                      nominee: item.fullName,
                      nomineeEmail: item.email,
                    },
                  });
                }}
                editButtonCallBack={() => {
                  router.push({
                    pathname: "/members/updateNominee",
                    params: { _id: item._id },
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

export default Members;
