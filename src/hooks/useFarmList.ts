import {useState} from 'react';

export const useFarmList = () => {
  const [visible, setVisible] = useState(false);
  const [loading] = useState(false);
  const closeMenu = () => {
    setVisible(false);
  };
  const openMenu = () => {
    setVisible(true);
  };

  return {visible, closeMenu, openMenu, loading};
};
