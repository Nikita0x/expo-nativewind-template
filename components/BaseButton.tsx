import { Pressable, Text } from 'react-native';

interface BaseButtonProps {
  onPress: () => void;
  title: string;
}

export function BaseButton({ onPress, title }: BaseButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex items-center justify-center rounded-full bg-amber-500 p-4"
    >
      <Text className="text-xl font-bold text-white">{title}</Text>
    </Pressable>
  );
}
