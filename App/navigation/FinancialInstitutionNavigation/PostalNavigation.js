import React from "react";
import { SCREEN_NAMES } from "../../constants/screenNames";
import AddPostalForm from "../../components/Postal/AddPostalForm";
import UpdatePostalForm from "../../components/Postal/UpdatePostalForm";
import PostalListScreen from "../../screens/PostalListScreen";
import PostalScreen from "../../screens/PostalScreen";

const PostalNavigation = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={SCREEN_NAMES.postalListScreen}
        component={PostalListScreen}
        options={{
          headerShown: true,
          title: "Post Office",
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.postalScreen}
        component={PostalScreen}
        options={({ route }) => ({
          headerShown: true,
          title: `Post office, ${route.params?.branchName}`,
        })}
      />
      <Stack.Screen
        name={SCREEN_NAMES.addPostalScreen}
        component={AddPostalForm}
        options={{
          headerShown: true,
          title: "Add Postal",
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.updatePostalScreen}
        component={UpdatePostalForm}
        options={{
          headerShown: true,
          title: "Edit Postal",
        }}
      />
    </Stack.Group>
  );
};

export default PostalNavigation;
