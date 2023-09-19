import React, { useEffect, useState } from "react";
import { getNodeId, isUiNodeInputAttributes } from "../../utils/oryForm";
import CustomErrorMessageGroup from "../Form/CustomErrorMessageGroup";
import OryNode from "./OryNode";

const OrySelfServiceFlow = ({ flow, only, onSubmit, textInputOverride }) => {
  const [inProgress, setInProgress] = useState(false);
  const [values, setValues] = useState({});
  const [nodes, setNodes] = useState([]);

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
        ) {
          return;
        }

        values[name] = node.attributes.value;
      }
    });

    setValues(values);
    setNodes(nodes);
  }, [flow]);

  if (!flow) return null;

  return (
    <>
      {nodes.map((node, index) => {
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

      <CustomErrorMessageGroup extraSpaceTop messages={flow.ui.messages} />
    </>
  );
};

export default OrySelfServiceFlow;
