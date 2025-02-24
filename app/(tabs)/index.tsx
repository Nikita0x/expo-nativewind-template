import { StyleSheet, TextInput, Pressable } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { useState } from "react";
import { BaseButton } from "@/components/BaseButton";
import { Text, View } from "../../components/Themed";
import { useEventStore } from "@/state/events.store";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

enum RepeatOptions {
    WEEKLY = "WEEKLY",
    BIWEEKLY = "BIWEEKLY",
    MONTHLY = "MONTHLY"
}

interface EventDate {
    date: string,
    time: string
}

interface Event {
    name: string,
    startDate: EventDate,
    endDate: EventDate,
    repeat: RepeatOptions
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
    const [event, setEvent] = useState<Event>({
        name: '',
        startDate: {
            date: '',
            time: ''
        },
        endDate: {
            date: '',
            time: ''
        },
        repeat: RepeatOptions.WEEKLY
    })

    const handleNameChange = (value: string) => {
        console.log("Value of input is: ", value);
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
        console.log(value)
        setEvent((prevEvent) => ({
          ...prevEvent,
          repeat: value,
        }));
      };

   
  return (
    <View className="text-white text-[2rem]">


<Calendar
  onDayPress={day => {
    console.log('selected day', day);
  }}
/>



<View className="flex flex-row justify-between bg-red-500">
    <Text>Event Name</Text>
<TextInput 
className="rounded-lg bg-black p-5 placeholder:text-red"
        onChangeText={handleNameChange}
        placeholder="Event name"
      />
</View>

<View className="flex flex-row justify-between bg-gray-400">
    <Text>Starts</Text>
    <TextInput 
        onChangeText={handleStartDate}
        className="rounded-lg bg-black p-5 placeholder:text-red"
        placeholder="Jan 28, 2025"
      />
      <TextInput 
        onChangeText={handleStartTime}
        className="rounded-lg bg-black p-5 placeholder:text-red"
        placeholder="03:00 PM"
      />
</View>

<View className="flex flex-row justify-between bg-gray-400">
    <Text>Ends</Text>
    <TextInput 
        onChangeText={handleEndDate}
        className="rounded-lg bg-black p-5 placeholder:text-red"
        placeholder="Jan 28, 2025"
      />
      <TextInput 
        onChangeText={handleEndTime}
        className="rounded-lg bg-black p-5 placeholder:text-red"
        placeholder="03:00 PM"
      />
</View>

     

<View>
    <Text>Repeat</Text>
    <Picker
        selectedValue={event.repeat}
        onValueChange={(itemValue) =>
            handleRepeat(itemValue)
        }
    >
        <Picker.Item label="Weekly" value={RepeatOptions.WEEKLY} />
        <Picker.Item label="Bi-Weekly" value={RepeatOptions.BIWEEKLY} />
        <Picker.Item label="Monthly" value={RepeatOptions.MONTHLY} />
    </Picker>
</View>

    <Text>{JSON.stringify(event, null, 2)}</Text>

        
<BaseButton 
 title="SAVE"
 onPress={() => {console.log('saved')}}
//  onPress={setEventStore}
/>
        
    </View>
  );
}
