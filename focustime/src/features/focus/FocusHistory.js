import React from 'react';
import { FlatList, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';

import { colors, fontSize, spacing } from '../../utils/styling';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Focus History:</Text>
            <FlatList
              style={styles.flatList}
              contentContainerStyle={styles.containerStyle}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <RoundedButton style = {styles.clearButton} title='Clear' size={90} onPress={() => onClear()}/>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0.5,
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.xl,
    color: colors.secondary,
  },
  flatList: {
    flex: 1,
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  historyItem: (status) => {
    return {
      fontSize: fontSize.large,
      color: status === true ? colors.complete : colors.incomplete,
    };
  },
  clearButton: {
    marginBottom: spacing.medium,
  }
});
