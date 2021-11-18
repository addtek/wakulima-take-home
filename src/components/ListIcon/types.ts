import React from 'react';
import {SvgProps} from 'react-native-svg';

export interface ListIconProps {
  iconType: React.FC<SvgProps>;
  fill: string;
  color: string;
  width?: number;
  height?: number;
  innerWidth?: number;
  innerHeight?: number;
  marginRight?: number;
  testID?: string;
}
