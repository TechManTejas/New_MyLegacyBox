import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useGetNewsQuery } from "../../redux/api/news/newsApiSlice";
import NewsCard from "./NewsCard";

const NewsIndex = () => {
  const {
    theme: { colors, spacing, fontSize },
  } = useTheme();

  const { data, isLoading, isError } = useGetNewsQuery({});

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.md,
      backgroundColor: colors.white300,
    },
    errorText: {
      color: colors.red400,
      fontSize: fontSize.md,
      textAlign: "center",
      marginTop: spacing.xl,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.blue500} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load news.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.data || []}
        keyExtractor={(item) => item.id || Math.random().toString()}
        renderItem={({ item }) => (
          <NewsCard
            title={item.title}
            description={item.description}
            date={item.date}
            onPress={() => console.log("News Pressed", item.id)}
          />
        )}
      />
    </View>
  );
};

export default NewsIndex;
