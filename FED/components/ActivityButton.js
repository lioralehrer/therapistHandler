import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ActivityButton = ({activity, buttonStyle, updateStyle, updateGoals}) => {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={buttonStyle} onPress={() => changeStyle(activity.id)}> */}
      <TouchableOpacity style={buttonStyle} onPress={() => {
          // updateStyle(activity.title);
          // updateGoals(activity.title);
          updateStyle(activity.id);
          updateGoals(activity.id);
        }}>
        <Text>{activity.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ActivityButton;