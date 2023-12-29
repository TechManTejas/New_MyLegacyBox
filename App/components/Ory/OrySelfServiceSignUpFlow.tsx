import React, { useEffect, useRef, useState } from "react";
import { getNodeId, isUiNodeInputAttributes } from "../../utils/oryForm";
import CustomErrorMessageGroup from "../Form/CustomErrorMessageGroup";
import OryNode from "./OryNode";
import {
  Dimensions,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import OryNodeInputSubmit from "./OryNodeInputSubmit";
import { z } from "zod";

const { width } = Dimensions.get("window");

const card1Validator = z
  .object({
    email: z
      .string({
        required_error: "email is required",
      })
      .refine(
        (email) =>
          email.endsWith("@gmail.com") ||
          email.endsWith("@hotmail.com") ||
          email.endsWith("@yahoo.com"),
        {
          message: "Invalid email",
        }
      ),
    phone: z
      .string({
        required_error: "phone number is required",
      })
      .refine((value) => !isNaN(value), {
        message: "Input should be a numeric value",
      })
      .refine((value) => /^\d{10}$/.test(value), {
        message: "Number should be of 10 digits",
      }),
  })
  .strict();

const card2Validator = z
  .object({
    first: z
      .string({
        required_error: "first name is required",
        invalid_type_error: "Invalid type for first name",
      })
      .refine((value) => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      }),
    last: z
      .string({
        required_error: "last name is required",
        invalid_type_error: "Invalid type for last name",
      })
      .refine((value) => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      }),
  })
  .strict();

const card3Validator = z
  .object({
    password: z.string({
      required_error: "password is required",
      invalid_type_error: "Invalid type for password",
    }),
  })
  .strict();

const OrySelfServiceSignUpFlow = ({
  flow,
  only,
  onSubmit,
  textInputOverride,
  cardNo, setCardNo
}) => {
  const [inProgress, setInProgress] = useState(false);
  const [values, setValues] = useState({});
  const [nodes, setNodes] = useState([]);
  const flatListRef = useRef(null);

  const [errorMessages, setErrorMessages] = useState([]);

  const {
    theme: { spacing, fontFamily, colors },
  } = useTheme();

  

  const onChange = (name) => (value) =>
    setValues((values) => ({ ...values, [name]: value }));

  const onPress = (name, value) => {
    setInProgress(true);
    onSubmit({ ...values, [name]: value })
      .then(() => setInProgress(false))
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });
  };

  useEffect(() => {
    if (!flow) return;

    const nodes = flow.ui.nodes.filter(({ group }) => {
      if (only) return group === only || group === "default";
      return true;
    });

    const values = {};

    nodes.forEach((node) => {
      const name = getNodeId(node);

      if (isUiNodeInputAttributes(node.attributes)) {
        if (
          node.attributes.type === "button" ||
          node.attributes.type === "submit"
        )
          return;
        values[name] = node.attributes.value;
      }
    });

    setValues(values);
    setNodes(nodes);
  }, [flow]);

  if (!flow) return null;

  const card1Nodes = nodes.filter(
    (node) =>
      node.attributes.name === "traits.email" ||
      node.attributes.name === "traits.phone"
  );

  const card2Nodes = nodes.filter(
    (node) =>
      node.attributes.name === "traits.name.first" ||
      node.attributes.name === "traits.name.last"
  );

  const card3Nodes = nodes.filter(
    (node) =>
      node.attributes.name === "password" ||
      node.attributes.name === "traits.referralCode"
  );

  const submitButtonNode = nodes.filter(
    (node) => node.attributes.type === "submit"
  )[0];

  const cards = [
    <View style={{ width: width - 71 }}>
      {card1Nodes.map((node, index) => {
        const name = getNodeId(node);

        return (
          <OryNode
            key={`ory-flow-${flow.id}-${name}-${index}`}
            textInputOverride={textInputOverride}
            disabled={inProgress}
            value={values[name]}
            onChange={onChange(name)}
            node={node}
            isSubmitting={inProgress}
            onSubmitPress={onPress}
            
          />
        );
      })}
    </View>,
    <View style={{ width: width - 71 }}>
      {card2Nodes.map((node, index) => {
        const name = getNodeId(node);

        return (
          <OryNode
            key={`ory-flow-${flow.id}-${name}-${index}`}
            textInputOverride={textInputOverride}
            disabled={inProgress}
            value={values[name]}
            onChange={onChange(name)}
            node={node}
            isSubmitting={inProgress}
            onSubmitPress={onPress}
          />
        );
      })}
    </View>,
    <View style={{ width: width - 71 }}>
      {card3Nodes.map((node, index) => {
        const name = getNodeId(node);

        return (
          <OryNode
            key={`ory-flow-${flow.id}-${name}-${index}`}
            textInputOverride={textInputOverride}
            disabled={inProgress}
            value={values[name]}
            onChange={onChange(name)}
            node={node}
            isSubmitting={inProgress}
            onSubmitPress={onPress}
          />
        );
      })}
    </View>,
  ];

  const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: spacing.lg,
    },
    button: {
      backgroundColor: colors.blue600,
      borderRadius: spacing.sm,
      width: "50%",
    },
    buttonText: {
      color: colors.white100,
      fontFamily: fontFamily.semiBold,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.xl,
      textAlign: "center",
    },
    disabledStyle: {
      backgroundColor: colors.blue300,
    },
    flatListStyle: {
      flexGrow: 0,
    },
  });

  const validatorList = [
    card1Validator.safeParse({
      email: values["traits.email"],
      phone: values["traits.phone"],
    }),
    card2Validator.safeParse({
      first: values["traits.name.first"],
      last: values["traits.name.last"],
    }),
    card3Validator.safeParse({
      password: values["password"],
    }),
  ];

  const slideToNextCard = () => {
    if (validatorList[cardNo].success === true && cardNo < 2) {
      setErrorMessages([])
      flatListRef.current.scrollToIndex({ index: cardNo + 1, animated: true });
      setCardNo((prev) => prev + 1);
    } else {
      Keyboard.dismiss()
      setErrorMessages(
        JSON.parse(validatorList[cardNo].error.message).map((obj) => {
          return {
            text: obj.message,
            id: Date.now(),
          };
        })
      );
    }
  };

  const slideToPrevCard = () => {
    if (cardNo > 0) {
      flatListRef.current.scrollToIndex({ index: cardNo - 1, animated: true });
      setCardNo((prev) => prev - 1);
    }
  };

  const nextDisableConditions = [
    values["traits.email"] === undefined ||
      values["traits.phone"] === undefined ||
      values["traits.email"] === "" ||
      values["traits.phone"] === "",
    values["traits.name.first"] === undefined ||
      values["traits.name.last"] === undefined ||
      values["traits.name.first"] === "" ||
      values["traits.name.last"] === "",
    values["password"] === undefined || values["password"] === "",
  ];

  return (
    <>


      <FlatList
        style={styles.flatListStyle}
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        horizontal
        scrollEnabled={false}
        data={cards}
        renderItem={({ item }) => item}
      />

      <View style={styles.buttonContainer}>
        <Pressable
          disabled={cardNo === 0}
          onPress={slideToPrevCard}
          style={[styles.button, cardNo === 0 ? styles.disabledStyle : {}]}
        >
          <Text style={styles.buttonText}>PREV</Text>
        </Pressable>

        {cardNo !== 2 ? (
          <Pressable
            disabled={nextDisableConditions[cardNo]}
            onPress={slideToNextCard}
            style={[
              styles.button,
              { marginLeft: spacing.xs },
              nextDisableConditions[cardNo] ? styles.disabledStyle : {},
            ]}
          >
            <Text style={styles.buttonText}>NEXT</Text>
          </Pressable>
        ) : (
          <View style={{ width: "50%", marginLeft: spacing.xs }}>
            <OryNodeInputSubmit
              isSubmitting={inProgress}
              onSubmitPress={onPress}
              node={submitButtonNode}
            />
          </View>
        )}
      </View>

      <View style={{ alignItems: "flex-start", justifyContent: "flex-start", width: "100%", }}>
        <CustomErrorMessageGroup extraSpaceTop messages={flow.ui.messages} />
        <CustomErrorMessageGroup extraSpaceTop messages={errorMessages} />
      </View>
    </>
  );
};

export default OrySelfServiceSignUpFlow;
