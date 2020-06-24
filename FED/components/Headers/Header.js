import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

Header.defaultProps = {
    title: 'Spectracker',
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'darkslateblue',
  },
  text: {
     color: '#fff',
     fontSize: 24,
     textAlign: 'center',
     fontFamily: 'sans-serif-light',

  }
})

export default Header;