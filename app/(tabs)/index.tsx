import { BaseButton } from '@/components/BaseButton';
import MyCalendar from '@/components/MyCalendar';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../../components/Themed';

enum RepeatOptions {
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
}

interface EventDate {
  date: {
    value: string;
    invalid: boolean;
  };
  time: {
    value: string;
    invalid: boolean;
  };
}

interface Event {
  name: string;
  startDate: EventDate;
  endDate: EventDate;
  repeat: RepeatOptions;
}

const dateRegex =
  /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (0[1-9]|[12][0-9]|3[01]), \d{4}$/;
const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] ?[APap][Mm]$/;

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

  const initialEventState: Event = {
    name: '',
    startDate: {
      date: { value: '', invalid: false },
      time: { value: '', invalid: false },
    },
    endDate: {
      date: { value: '', invalid: false },
      time: { value: '', invalid: false },
    },
    repeat: RepeatOptions.WEEKLY,
  };

  const [selected, setSelected] = useState('');
  const [event, setEvent] = useState<Event>(initialEventState);

  const inputStartDateStyles = [
    styles.input,
    event.startDate.date.invalid && styles.inputError,
  ];

  const inputStartTimeStyles = [
    styles.input,
    event.startDate.time.invalid && styles.inputError,
  ];

  const inputEndDateStyles = [
    styles.input,
    event.endDate.date.invalid && styles.inputError,
  ];

  const inputEndTimeStyles = [
    styles.input,
    event.endDate.time.invalid && styles.inputError,
  ];

  const handleNameChange = (value: string) => {
    console.log('Value of input is: ', value);
    setEvent((prevEvent) => ({
      ...prevEvent,
      name: value.trim(),
    }));
  };

  const handleStartDate = (value: string) => {
    if (value.length === 0) {
      setEvent((prevEvent) => ({
        ...prevEvent,
        startDate: {
          ...prevEvent.startDate,
          date: {
            value: '',
            invalid: false,
          },
        },
      }));

      return;
    }

    const trimmedValue = value.trimStart();
    const isValid = dateRegex.test(trimmedValue);

    setEvent((prevEvent) => ({
      ...prevEvent,
      startDate: {
        ...prevEvent.startDate,
        date: {
          value: trimmedValue,
          invalid: !isValid,
        },
        time: prevEvent.startDate.time,
      },
    }));
  };

  const handleStartTime = (value: string) => {
    if (value.length === 0) {
      setEvent((prevEvent) => ({
        ...prevEvent,
        startDate: {
          ...prevEvent.startDate,
          time: {
            value: '',
            invalid: false,
          },
        },
      }));

      return;
    }

    const trimmedValue = value.trimStart();
    const isValidTime = timeRegex.test(trimmedValue);

    setEvent((prevEvent) => ({
      ...prevEvent,
      startDate: {
        ...prevEvent.startDate,
        time: {
          value: trimmedValue,
          invalid: !isValidTime,
        },
      },
    }));
  };

  const handleEndDate = (value: string) => {
    if (value.length === 0) {
      setEvent((prevEvent) => ({
        ...prevEvent,
        endDate: {
          ...prevEvent.endDate,
          date: {
            value: '',
            invalid: false,
          },
        },
      }));

      return;
    }

    const trimmedValue = value.trimStart();
    const isValidDate = dateRegex.test(trimmedValue);
    setEvent((prevEvent) => ({
      ...prevEvent,
      endDate: {
        ...prevEvent.endDate,
        date: {
          value: trimmedValue,
          invalid: !isValidDate,
        },
      },
    }));
  };

  const handleEndTime = (value: string) => {
    if (value.length === 0) {
      setEvent((prevEvent) => ({
        ...prevEvent,
        endDate: {
          ...prevEvent.endDate,
          time: {
            value: '',
            invalid: false,
          },
        },
      }));

      return;
    }

    const trimmedValue = value.trimStart();
    const isValidTime = timeRegex.test(trimmedValue);
    setEvent((prevEvent) => ({
      ...prevEvent,
      endDate: {
        ...prevEvent.endDate,
        time: {
          value: trimmedValue,
          invalid: !isValidTime,
        },
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

  const saveEvent = () => {
    // Trim whitespace from the event name
    const trimmedName = event.name.trim();

    // Initialize an array to collect error messages
    const errors = [];

    // Validate event name
    if (trimmedName.length === 0) {
      errors.push('Name is required.');
    }

    // Validate start date
    if (event.startDate.date.value.trim().length === 0) {
      errors.push('Start date is required.');
    } else if (event.startDate.date.invalid) {
      errors.push('Start date is invalid.');
    }

    // Validate start time
    if (event.startDate.time.value.trim().length === 0) {
      errors.push('Start time is required.');
    } else if (event.startDate.time.invalid) {
      errors.push('Start time is invalid.');
    }

    // Validate end date
    if (event.endDate.date.value.trim().length === 0) {
      errors.push('End date is required.');
    } else if (event.endDate.date.invalid) {
      errors.push('End date is invalid.');
    }

    // Validate end time
    if (event.endDate.time.value.trim().length === 0) {
      errors.push('End time is required.');
    } else if (event.endDate.time.invalid) {
      errors.push('End time is invalid.');
    }

    // If there are any errors, log them and prevent saving
    if (errors.length > 0) {
      errors.forEach((error) => console.log(error));
      return;
    }

    // If all validations pass, save the event and reset the state
    setEvent(initialEventState);
    console.log('Event saved successfully.');
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
            value={event.name}
          />
        </View>

        <View className="mb-3 flex-row items-center justify-between bg-transparent pt-3">
          <Text className="font-bold text-black">Starts</Text>
          <View className="flex-row gap-5 bg-transparent">
            <TextInput
              onChangeText={handleStartDate}
              className="w-32 rounded-xl bg-white p-5"
              placeholder="Jan 28, 2025"
              style={inputStartDateStyles}
              placeholderTextColor="gray"
              value={event.startDate.date.value}
            />
            <TextInput
              onChangeText={handleStartTime}
              className="w-32 rounded-xl bg-white p-5"
              placeholder="03:00 PM"
              style={inputStartTimeStyles}
              placeholderTextColor="gray"
              value={event.startDate.time.value}
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
              style={inputEndDateStyles}
              placeholderTextColor="gray"
              value={event.endDate.date.value}
            />
            <TextInput
              onChangeText={handleEndTime}
              className="w-32 rounded-xl bg-white p-5"
              placeholder="03:00 PM"
              style={inputEndTimeStyles}
              placeholderTextColor="gray"
              value={event.endDate.time.value}
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

        <Text className="text-[12px] text-black">
          {JSON.stringify(event, null, 2)}
        </Text>

        <BaseButton title="SAVE" onPress={saveEvent} />
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
  input: {
    width: 128, // Equivalent to 32 * 4 (since React Native uses pixels)
    borderRadius: 12, // Equivalent to 'rounded-xl'
    padding: 20, // Equivalent to 'p-5'
    backgroundColor: 'white',
    color: 'black',
  },
  inputError: {
    backgroundColor: '#fee2e2', // Equivalent to 'bg-red-100'
    borderColor: '#b91c1c', // Equivalent to 'border-red-700'
    borderWidth: 1,
  },
});
