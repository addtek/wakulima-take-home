import React from 'react';
import {SvgProps} from 'react-native-svg';

export interface IconProps {
  iconType: React.FC<SvgProps>;
  fill?: string;
  color?: string;
  height?: number;
  width?: number;
}
