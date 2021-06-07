import React, { useState } from 'react';
import { Text, View, Platform, StyleSheet, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

import { colors, fontSize, spacing } from '../../utils/styling';

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(0.1);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const changeTime = (time) => {
    setMinutes(time);
    setProgress(1);
    setIsStarted(false);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(0);
    setProgress(0);
    setIsStarted(false);
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdownContainer}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.timerHeading}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <ProgressBar
        progress={progress}
        color={colors.secondary}
        style={styles.bar}
      />
      <View style={styles.outerTimingContainer}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonContainer}>
        <RoundedButton
          title={isStarted === false ? 'Start' : 'Pause'}
          onPress={() => {
            setIsStarted(!isStarted);
          }}
        />
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="Cancel" size={90} onPress={() => clearSubject()}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdownContainer: {
    flex: 0.3,
    paddingTop: spacing.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerHeading: {
    paddingBottom: spacing.small,
    paddingTop: spacing.small,
  },
  title: {
    color: colors.secondary,
    textAlign: 'center',
    fontSize: fontSize.large,
  },
  task: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: fontSize.large,
    textAlign: 'center',
  },
  bar: {
    height: spacing.small,
    marginTop: spacing.medium,
  },
  outerTimingContainer: {
    flex: 0.3,
  },
  buttonContainer: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearSubject: {
    paddingBottom: spacing.small,
    paddingLeft: spacing.small,
  }
});
