import { StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { BaseButton } from '@/components/BaseButton';
import { Text, View } from '../../components/Themed';
import { useEventStore } from '@/state/events.store';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import MyCalendar from '@/components/MyCalendar';

enum RepeatOptions {
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
}

interface EventDate {
  date: string;
  time: string;
}

interface Event {
  name: string;
  startDate: EventDate;
  endDate: EventDate;
  repeat: RepeatOptions;
}

export default function TabOneScreen() {
  return (
    <View className="bg-green-500">
      <Test />
    </View>
  );
}

export function Test() {
  //   const {eventStore, setEventStore} = useEventStore()
  // TODO: переделать на стор zustand

  const [selected, setSelected] = useState('');
  const [event, setEvent] = useState<Event>({
    name: '',
    startDate: {
      date: '',
      time: '',
    },
    endDate: {
      date: '',
      time: '',
    },
    repeat: RepeatOptions.WEEKLY,
  });

  const handleNameChange = (value: string) => {
    console.log('Value of input is: ', value);
    setEvent((prevEvent) => ({
      ...prevEvent,
      name: value.trim(),
    }));
  };

  const handleStartDate = (value: string) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      startDate: {
        ...prevEvent.startDate,
        date: value.trim(),
      },
    }));
  };

  const handleStartTime = (value: string) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      startDate: {
        ...prevEvent.startDate,
        time: value.trim(),
      },
    }));
  };

  const handleEndDate = (value: string) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      endDate: {
        ...prevEvent.endDate,
        date: value.trim(),
      },
    }));
  };

  const handleEndTime = (value: string) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      endDate: {
        ...prevEvent.endDate,
        time: value.trim(),
      },
    }));
  };

  const handleRepeat = (value: RepeatOptions) => {
    console.log(value);
    setEvent((prevEvent) => ({
      ...prevEvent,
      repeat: value,
    }));
  };

  return (
    <ScrollView>
      <View className="bg-gray-200 p-5 text-[2rem]">
        <MyCalendar />

        <View className="flex justify-between bg-transparent pt-5">
          <Text className="mb-3 font-bold text-black">Event Name</Text>
          <TextInput
            className="rounded-xl bg-white p-5"
            onChangeText={handleNameChange}
            placeholder="Event name"
            style={{ color: 'black' }}
            placeholderTextColor="gray"
          />
        </View>

        <View className="mb-3 flex-row items-center justify-between bg-transparent pt-3">
          <Text className="font-bold text-black">Starts</Text>
          <View className="flex-row gap-5 bg-transparent">
            <TextInput
              onChangeText={handleStartDate}
              className="w-32 rounded-xl bg-white p-5"
              placeholder="Jan 28, 2025"
              style={{ color: 'black' }}
              placeholderTextColor="gray"
            />
            <TextInput
              onChangeText={handleStartTime}
              className="w-32 rounded-xl bg-white p-5"
              placeholder="03:00 PM"
              style={{ color: 'black' }}
              placeholderTextColor="gray"
            />
          </View>
        </View>

        <View className="flex-row items-center justify-between bg-transparent">
          <Text className="font-bold text-black">Ends</Text>
          <View className="flex-row gap-5 bg-transparent">
            <TextInput
              onChangeText={handleEndDate}
              className="w-32 rounded-xl bg-white p-5"
              placeholder="Jan 28, 2025"
              style={{ color: 'black' }}
              placeholderTextColor="gray"
            />
            <TextInput
              onChangeText={handleEndTime}
              className="w-32 rounded-xl bg-white p-5"
              placeholder="03:00 PM"
              style={{ color: 'black' }}
              placeholderTextColor="gray"
            />
          </View>
        </View>

        <View className="mb-5 bg-transparent">
          <Text className="mb-3 font-bold text-black">Repeat</Text>
          <Picker
            selectedValue={event.repeat}
            onValueChange={(itemValue) => handleRepeat(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Weekly" value={RepeatOptions.WEEKLY} />
            <Picker.Item label="Bi-Weekly" value={RepeatOptions.BIWEEKLY} />
            <Picker.Item label="Monthly" value={RepeatOptions.MONTHLY} />
          </Picker>
        </View>

        {/* <Text>{JSON.stringify(event, null, 2)}</Text> */}

        <BaseButton
          title="SAVE"
          onPress={() => {
            console.log('saved');
          }}
          //  onPress={setEventStore}
        />

        <BaseButton
          title="SAVE"
          onPress={() => {
            console.log('saved');
          }}
          //  onPress={setEventStore}
        />

        <BaseButton
          title="SAVE"
          onPress={() => {
            console.log('saved');
          }}
          //  onPress={setEventStore}
        />

        <BaseButton
          title="SAVE"
          onPress={() => {
            console.log('saved');
          }}
          //  onPress={setEventStore}
        />

        <BaseButton
          title="SAVE"
          onPress={() => {
            console.log('saved');
          }}
          //  onPress={setEventStore}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  picker: {
    fontSize: 14,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    height: 55,
    width: '100%',
    alignSelf: 'center',
  },
});
