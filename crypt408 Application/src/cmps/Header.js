import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = (props) => {
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    alignItems: "center",
    display: "flex",
    marginTop: 10,
    flex: 1,
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 26,
    color: '#FFFFFF'
  }
})

const { viewStyle, textStyle } = styles;
export default Header;
