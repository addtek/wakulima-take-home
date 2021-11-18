import React from 'react';

import {IconProps} from './types';
import add from 'src/assets/icons/Plus.svg';
import pause from 'src/assets/icons/PauseCircle.svg';
import record from 'src/assets/icons/Record.svg';
import recordTransparent from 'src/assets/icons/Record-2.svg';
import check from 'src/assets/icons/CheckCircle.svg';
import send from 'src/assets/icons/send.svg';
import refresh from 'src/assets/icons/refresh-cw.svg';
import trashTransparent from 'src/assets/icons/trash-2.svg';
import trash from 'src/assets/icons/Trash.svg';
import backIcon from 'src/assets/icons/ArrowLeft.svg';
import plant from 'src/assets/icons/Plant.svg';
import more from 'src/assets/icons/More.svg';
import infoCircle from 'src/assets/icons/exclamation-circle.svg';

export const AppIcons = {
  add,
  pause,
  recordTransparent,
  record,
  check,
  send,
  refresh,
  trash,
  trashTransparent,
  backIcon,
  plant,
  more,
  infoCircle,
};

export const Icon = ({iconType, ...rest}: IconProps): React.ReactElement => {
  const Component = iconType;
  return <Component {...rest} />;
};

//Usage
//import { MenuIcons, Icons } from 'src/assets/index'
//<Icons iconType={MenuIcons.profileIcon} fill={'orange'} height={200} />
