import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSize, spacing, colors } from '../../utils/styling';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
          />
          <RoundedButton
            title="+"
            size={50}
            onPress={() => {
              addSubject(subject);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: .5,
  },
  titleContainer: {
    flex: 0.5,
    padding: spacing.medium,
    justifyContent: 'center',
  },
  title: {
    color: colors.secondary,
    fontWeight: 'folding',
    fontSize: fontSize.large,
  },
  inputContainer: {
    paddingTop: spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: spacing.medium,
  },
});
