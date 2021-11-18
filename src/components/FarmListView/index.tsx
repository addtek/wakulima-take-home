import React from 'react';
import {View} from 'react-native';
import {AppText} from 'src/components/AppText';
import {ActionButton} from 'src/components/ActionButton';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {AppIcons, Icon} from 'src/components/Icon';
import styles from './styles';
import {Separator} from 'src/components/Separator';
import {useFarmList} from 'src/hooks/useFarmList';
import {AppColors} from 'src/theme';
import {SvgProps} from 'react-native-svg';

interface MenuItemType {
  type: 'danger' | 'normal';
  icon?: React.FC<SvgProps>;
  label: string;
}
const MenuItem = ({type, icon, label}: MenuItemType) => {
  return (
    <View style={styles.menuItem}>
      {icon && <Icon iconType={icon} width={11} height={11} />}
      <View style={styles.menuItemLabel}>
        <AppText
          style={{
            color: type === 'normal' ? AppColors.Black : 'red',
            fontSize: 13,
          }}>
          {label}
        </AppText>
      </View>
    </View>
  );
};

export const FarmListView = () => {
  const {visible, closeMenu, openMenu} = useFarmList();
  return (
    <View>
      <View style={styles.toolbar}>
        <View style={styles.toolbarRow}>
          <AppText style={styles.toolbarTitle}>Farm List</AppText>
          <Menu
            opened={visible}
            onClose={closeMenu}
            onOpen={openMenu}
            onBackdropPress={closeMenu}>
            <MenuTrigger>
              <ActionButton
                onPress={openMenu}
                styles={styles.buttonStyle}
                child={<Icon iconType={AppIcons.more} width={4} height={18} />}
              />
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.menuContainer}>
              <MenuOption onSelect={() => null}>
                <MenuItem
                  icon={AppIcons.refresh}
                  type="normal"
                  label="Refresh"
                />
              </MenuOption>
              <MenuOption onSelect={() => null}>
                <MenuItem icon={AppIcons.send} type="normal" label="Send" />
              </MenuOption>
              <MenuOption onSelect={() => null}>
                <MenuItem
                  icon={AppIcons.trashTransparent}
                  type="danger"
                  label="Delete"
                />
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <Separator />
      </View>
      <View style={styles.farmFieldListContainer}>
        <View style={styles.tableHeading}>
          <View style={[styles.tableHeadingCell, styles.tableIdCell]}>
            <AppText style={styles.idText}>#ID</AppText>
          </View>
          <View style={styles.tableLabelCell}>
            <AppText>Label</AppText>
          </View>
          <View style={styles.tableSizeCell}>
            <AppText>Size</AppText>
          </View>
        </View>
      </View>
    </View>
  );
};
