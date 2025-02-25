import React from 'react';
import { Calendar } from 'react-native-calendars';

const MyCalendar = () => {
  const today = new Date().toISOString().split('T')[0];

  const markedDates = {
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
  };

  return (
    <Calendar
      // Specify the current date
      current={today}
      // Apply the marked dates
      markedDates={markedDates}
      // Set the marking type to 'custom' for custom styling
      markingType={'custom'}
      // Additional props
      onDayPress={(day: any) => {
        console.log('selected day', day);
      }}
      showSixWeeks={true}
    />
  );
};

export default MyCalendar;
