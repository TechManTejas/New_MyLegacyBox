import React from "react";
import AddPostalForm from "../../components/Postal/AddPostalForm";
import UpdatePostalForm from "../../components/Postal/UpdatePostalForm";
import PostalListScreen from "../../screens/Assets/PostalListScreen";
import PostalScreen from "../../screens/Assets/PostalScreen";
import { StackType } from "../RootNavigator/RootNavigator";

const PostalNavigation: React.FC<StackType> = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={"POSTAL_LIST_SCREEN"}
        component={PostalListScreen}
        options={{
          headerShown: true,
          title: "Post Office",
        }}
      />
      <Stack.Screen
        name={"POSTAL_SCREEN"}
        component={PostalScreen}
        options={({ route }) => ({
          headerShown: true,
          title: `Post office, ${route.params?.postal?.branchName}`,
        })}
      />
      <Stack.Screen
        name={"ADD_POSTAL_SCREEN"}
        component={AddPostalForm}
        options={{
          headerShown: true,
          title: "Add Postal",
        }}
      />
      <Stack.Screen
        name={"UPDATE_POSTAL_SCREEN"}
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
