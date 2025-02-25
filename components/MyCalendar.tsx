import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

const MyCalendar = () => {
  const today = new Date().toISOString().split('T')[0];

  // State to manage marked dates
  const [markedDates, setMarkedDates] = useState({
    [today]: {
      customStyles: {
        container: {
          backgroundColor: 'orange',
          borderRadius: 50,
        },
        text: {
          color: 'white',
        },
      },
    },
  });

  const onDayPress = (day: any) => {
    const { dateString } = day;

    if (markedDates[dateString]) {
      Alert.alert('Date Unavailable', 'An event already exists on this date.');
    } else {
      const newMarkedDates = {
        ...markedDates,
        [dateString]: {
          customStyles: {
            container: {
              backgroundColor: 'blue',
              borderRadius: 50,
            },
            text: {
              color: 'white',
            },
          },
        },
      };
      setMarkedDates(newMarkedDates);
    }
  };

  return (
    <Calendar
      current={today}
      markedDates={markedDates}
      markingType={'custom'}
      onDayPress={onDayPress}
      showSixWeeks={true}
    />
  );
};

export default MyCalendar;
