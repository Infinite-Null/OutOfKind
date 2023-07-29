import { Text } from "@nextui-org/react";

export default function Heading(){
    return <Text
    h1
    size={60}
    css={{
      textGradient: "45deg, $blue600 -20%, $purple600 50%",
      textAlign:"center"
    }}
    weight="bold"
  >
    Out Of Kind ✨
  </Text>
}