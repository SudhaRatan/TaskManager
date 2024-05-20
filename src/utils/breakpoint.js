import { useWindowDimensions } from "react-native";

const medium = 768;
const small = 480;

export function useBreakPoint(s, m, l) {
  const { width } = useWindowDimensions();
  if (width > medium) return l;
  else if (width <= medium && width > small) return m;
  else return s;
}
