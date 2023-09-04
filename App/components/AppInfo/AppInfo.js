import {
    View,
    Text,
    Modal,
    FlatList,
    Pressable,
    StyleSheet,
  } from "react-native";
  import React, { useState, useRef } from "react";
  import { useTheme } from "../../theme/ThemeProvider";
  import { APP_INFO_DATA } from "../../data/appInfodata";
  import InfoItem from "./InfoItem";
  import { useDispatch, useSelector } from "react-redux";
  import { setShowModal } from "../../services/appTour/appTour";
import { getItemAsync, setItemAsync } from "expo-secure-store";
  
  const AppInfo = () => {
    const {
      theme: { colors, fontFamily, spacing, fontSize },
    } = useTheme();
  
    const styles = StyleSheet.create({
      modal: {
        backgroundColor: colors.white100,
        flex: 1,

        // borderWidth: 1,
        // borderColor: colors.black300
      },
  
      indicatorContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: spacing.u100,
        paddingBottom: spacing.u100,

        // borderWidth: 1,
        // borderColor: colors.black300
      },
      indicator: {
        height: 8,
        width: 8,
        backgroundColor: colors.black100,
        marginHorizontal: spacing.xs,
        borderRadius: 50,
      },
      indicatorActive: {
        backgroundColor: colors.blue,
      },
  
      buttonContainer: {
        // borderWidth: 1,
        // borderColor: colors.black300,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
  
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.xl,
      },
      skipButtonContainer: {
        borderRadius: spacing.xl,
        backgroundColor: colors.blue100,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.sm,
      },
      skipButton: {
        fontFamily: fontFamily.semiBold,
        color: colors.blue300,
      },
    });
  
    const [visibleItemIndex, setVisibleItemIndex] = useState(0);
  
    const onViewCallBackRef = useRef(
      ({ viewableItems }) => {
        if (viewableItems.length > 0) {
          setVisibleItemIndex(viewableItems[0].index);
        }
      }
    );
  
    const viewConfigRef = useRef({
      viewAreaCoveragePercentThreshold: 50,
    });
  
    const flatListRef = useRef(null);
  
    const dispatch = useDispatch()
  
    const appTourModalVisible = useSelector((state) => state.appTour.showModal)

    const hideAppInfo = () => {
        dispatch(setShowModal(false))
        getItemAsync("appInfoShown").then((res) => {
            if (res === null) setItemAsync("appInfoShown", 'true')
        })
    }
  
    return (
      <Modal transparent visible={appTourModalVisible} animationType="slide">
        <View style={styles.modal}>

         
          <FlatList
            data={APP_INFO_DATA}
            onViewableItemsChanged={onViewCallBackRef.current}
            viewabilityConfig={viewConfigRef.current}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            renderItem={({ item }) => <InfoItem item={item} />}
            keyExtractor={(item) => item.id}
            ref={flatListRef}

          />
  
          <View style={styles.indicatorContainer}>
            {APP_INFO_DATA.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  visibleItemIndex === index && styles.indicatorActive,
                ]}
              />
            ))}
          </View>
  
          <View style={styles.buttonContainer}>
            <Text></Text>
            <Pressable
              onPress={hideAppInfo}
              style={styles.skipButtonContainer}
            >
              <Text style={styles.skipButton}>SKIP</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };
  
  export default AppInfo;
  