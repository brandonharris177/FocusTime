import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontSize, colors, spacing } from '../utils/styling';

const minutesToMilliseconds = (min) => {
  return min * 1000 * 60;
};
const formatTime = (time) => {
  if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
};

export const Countdown = ({ minutes, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);
  const [milliseconds, setMilliseconds] = useState(null);

  const countDown = (time) => {
    setMilliseconds((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      } else {
        const timeLeft = time - 1000;
        onProgress(timeLeft / minutesToMilliseconds(minutes));
        return timeLeft;
      }
    });
  };

  useEffect(() => {
    setMilliseconds(minutesToMilliseconds(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => {
      clearInterval(interval.current);
    };
  }, [isPaused]);

  const minute = Math.floor(milliseconds / 1000 / 60) % 60;
  const second = Math.floor(milliseconds / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(second)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.xxxl,
    fontWeight: 'bold',
    color: colors.secondary,
    padding: spacing.large,
    backgroundColor: colors.ternary,
  },
});
