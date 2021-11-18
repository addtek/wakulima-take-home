import React from 'react';
import {Text} from 'react-native';

import {AppTextProps} from './app-text.types';

import {Typography} from 'src/theme';

export const AppText = ({
  children,
  ...props
}: AppTextProps): React.ReactElement => (
  <Text
    {...props}
    allowFontScaling={false}
    style={[{fontSize: Typography.TypeSizes.base}, props.style]}
    ellipsizeMode={props.ellipsizeMode ?? 'tail'}>
    {children}
  </Text>
);
