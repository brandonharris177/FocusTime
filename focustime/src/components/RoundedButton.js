import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from "../utils/styling"

export const RoundedButton = ({
  style = {},
  testStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles(size).radius, style]}
      onPress={props.onPress}>
      <Text style={[styles(size).text]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.secondary,
      borderWidth: 2,
    },
    text: {
      color: colors.secondary,
      fontSize: size / 3.3,
    },
  });
