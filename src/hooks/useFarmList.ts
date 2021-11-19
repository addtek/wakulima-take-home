import {useContext, useState} from 'react';
import {FarmContext} from 'src/providers/farm-provider/farm.context';
import {navigateMasterScreen} from 'src/services/navigation/master-navigator';
import {useDiscardDialog} from 'src/components/DiscardDialog';

export const useFarmList = () => {
  const previewFarm = (id: number) => {
    navigateMasterScreen('fieldMonitoring', {farmId: id});
  };
  const {
    farms,
    selectFarm,
    setFarms,
    sending,
    setSending,
    removeFarmFromSelection,
    refreshing,
    setRefreshing,
    setDeleting,
    deleting,
    selectedFarms,
    deleteFarm,
    getFarms,
    setWarn,
    warn,
  } = useContext(FarmContext);
  const [visible, setVisible] = useState(false);
  const [loading] = useState(false);
  const closeMenu = () => {
    setVisible(false);
  };
  const openMenu = () => {
    setVisible(true);
  };
  const cancelDelete = () => {
    closeSheet();
    setTimeout(() => setWarn(false));
  };
  const onConfirmDelete = () => {
    deleteFarm();
    setTimeout(() => setWarn(false));
  };
  const {closeSheet, Dialog} = useDiscardDialog({
    onCancel: cancelDelete,
    onConfirm: onConfirmDelete,
    message:
      'Note that your data will be lost! Are you sure you wand to delete the selected farms?',
  });
  const warnUser = () => {
    closeMenu();
    setWarn(true);
  };

  return {
    visible,
    setWarn: warnUser,
    warn,
    closeMenu,
    openMenu,
    loading,
    farms,
    selectFarm,
    setSending,
    sending,
    refreshing,
    setRefreshing,
    removeFarmFromSelection,
    deleting,
    setDeleting,
    setFarms,
    previewFarm,
    selectedFarms,
    deleteFarm,
    getFarms,
    Dialog,
  };
};
