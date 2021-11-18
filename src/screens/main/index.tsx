import React, {useMemo} from 'react';
import {Dimensions, View} from 'react-native';
import CollapsibleToolbar from 'src/components/CollapsibleToolbar';

import styles from './styles';
import {useHeaderHeight} from '@react-navigation/elements';
import {ToolbarHeader} from 'src/components/ToolbarHeader';
import {FarmListView} from 'src/components/FarmListView';
import {ActionButton} from 'src/components/ActionButton';
import {AppIcons, Icon} from 'src/components/Icon';
import {navigateMasterScreen} from 'src/services/navigation/master-navigator';
// import {LoadingIndicator} from 'components/LoadingIndicator';
const HEADER_EXPANDED_HEIGHT = 350;

export const HomeScreen = () => {
  let deviceHeaderHeight: number;
  deviceHeaderHeight = useHeaderHeight();

  const {width: SCREEN_WIDTH} = Dimensions.get('screen');

  let headerHeight: number;
  headerHeight = useMemo(
    () => HEADER_EXPANDED_HEIGHT - deviceHeaderHeight,
    [deviceHeaderHeight],
  );
  return (
    <View style={styles.container}>
      <CollapsibleToolbar
        headerComponentHeight={headerHeight}
        scrollContainerStyle={{paddingTop: headerHeight - 35}}
        title="Wakulima"
        header={
          <ToolbarHeader
            headerHeight={headerHeight}
            screenWidth={SCREEN_WIDTH}
          />
        }>
        <View style={styles.scrollContainerWrap}>
          <View style={styles.scrollContainer}>
            <FarmListView />
          </View>
          {/*{loading && <LoadingIndicator size="small" />}*/}
        </View>
      </CollapsibleToolbar>
      <View style={styles.floatingButtonWrap}>
        <ActionButton
          onPress={() =>
            navigateMasterScreen('fieldMonitoring', {farmId: '343@#'})
          }
          styles={styles.floatingButton}
          child={<Icon iconType={AppIcons.add} width={30} />}
        />
      </View>
    </View>
  );
};
