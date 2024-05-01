import {
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import {Drawer} from "react-native-paper"

const NavigationDrawer = ({ state, navigation, descriptors }) => {
  const isSelected = (index) => index === state.index;
  return (
    <DrawerContentScrollView>
      {state.routes.map((item, index) => {
        return (
          <Drawer.Item
            key={item.key}
            label={item.name}
            active={isSelected(index)}
            onPress={() => {
              navigation.navigate(item.name);
            }}
          />
        );
      })}
    </DrawerContentScrollView>
  );
};

export default NavigationDrawer;
