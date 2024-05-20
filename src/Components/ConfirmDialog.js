import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useBreakPoint } from "../utils/breakpoint";

const ConfirmDialog = forwardRef(
  ({ iconName, title, text, dismissText, okText, action }, ref) => {
    const [visible, setVisible] = useState(false);

    const hideDialog = () => {
      setVisible(false);
    };

    const showDialog = () => {
      setVisible(true);
    };

    const [params, setParams] = useState(null);
    useImperativeHandle(
      ref,
      () => {
        return {
          showDialog,
          setParams,
        };
      },
      []
    );

    return (
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{
            width: useBreakPoint("90%", "70%", "45%"),
            alignSelf: "center",
            maxWidth:400
          }}
        >
          {iconName && <Dialog.Icon size={30} icon={iconName} />}
          <Dialog.Title style={{ textAlign: "center" }}>
            {title ? title : "Alert"}
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ fontSize: 16 }} variant="bodyMedium">
              {text}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>
              {dismissText ? dismissText : "Cancel"}
            </Button>
            <Button
              onPress={() => {
                action(params);
                hideDialog();
              }}
            >
              {okText ? okText : "Ok"}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
);

export default ConfirmDialog;
