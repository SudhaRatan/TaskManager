import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Dialog, Icon, Portal, Text } from "react-native-paper";
import { useBreakPoint } from "../utils/breakpoint";
import { View } from "react-native";

const ConfirmDialog = forwardRef(
  ({ iconName, title, text, dismissText, okText, action }, ref) => {
    const [visible, setVisible] = useState(false);
    const [params, setParams] = useState(null);

    const hideDialog = () => {
      setVisible(false);
    };

    const showDialog = () => {
      setVisible(true);
    };

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
            maxWidth: 400,
          }}
        >
          <Dialog.Title>
            <View style={{flexDirection:"row", gap:10}}>
              {iconName && <Icon size={30} source={iconName} />}

              {title ? <Text>{title}</Text> : <Text>Alert</Text>}
            </View>
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
