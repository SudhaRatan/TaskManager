import { withTheme } from "react-native-paper";
import { View } from "react-native";

const ScreenBackground = ({ theme, style, children }) => {
  const backgroundStyle = { flex: 1, backgroundColor: theme.colors.background };
  return <View style={[style, backgroundStyle]}>{children}</View>;
};

export default withTheme(ScreenBackground);
