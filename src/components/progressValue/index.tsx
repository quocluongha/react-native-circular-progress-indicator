// implementation reference from
// https://github.com/wcandillon/react-native-redash/blob/master/src/ReText.tsx
// and https://github.com/coinjar/react-native-wagmi-charts/
// blob/master/src/components/AnimatedText.tsx for web compatibility

import React, { useMemo, useRef } from 'react';
import { Platform } from 'react-native';
import { useAnimatedReaction } from 'react-native-reanimated';
import AnimateableText from 'react-native-animateable-text';

import COLORS from '../../utils/colors';
import type { ProgressValueProps } from '../../types';

import styles from './styles';

const ProgressValue: React.FC<ProgressValueProps> = ({
  radius = 60,
  activeStrokeColor = COLORS.GREEN,
  progressValueColor,
  progressValueStyle = {},
  progressValueFontSize,
  progressValue,
  animatedTextProps,
  allowFontScaling = true,
}: ProgressValueProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = useRef<any>(null);

  if (Platform.OS === 'web') {
    // only run the reaction on web platform.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAnimatedReaction(
      () => {
        return progressValue.value;
      },
      (data, prevData) => {
        if (data !== prevData && inputRef.current) {
          inputRef.current.value = data;
        }
      }
    );
  }

  const styleProps = useMemo(
    () => ({
      radius,
      progressValueColor,
      progressValueFontSize,
      progressValueStyle,
      activeStrokeColor,
    }),
    [
      radius,
      progressValueColor,
      progressValueFontSize,
      progressValueStyle,
      activeStrokeColor,
    ]
  );

  return (
    <AnimateableText
      testID="progress-value-text"
      ref={inputRef}
      style={[
        styles(styleProps).input,
        progressValueStyle,
        styles(styleProps).fromProps,
      ]}
      animatedProps={animatedTextProps}
      allowFontScaling={allowFontScaling}
    />
  );
};

export default ProgressValue;
