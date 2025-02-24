import { Pressable, Text } from "react-native";

interface BaseButtonProps {
    onPress: () => void;
    title: string;
  }


export function BaseButton({onPress, title}: BaseButtonProps) {
  return (
    <Pressable
            onPress={onPress}
            className="bg-green-500 p-4 rounded-lg flex justify-center items-center"
        >
            <Text className="text-white text-xl">{title}</Text>
      </Pressable>
  );
}