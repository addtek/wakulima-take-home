import React, {useState} from 'react';
import {AppText} from 'src/components/AppText';
import styles from './styles';
import {TouchableWithoutFeedback, View} from 'react-native';
import {HStack} from 'native-base';

export type TabContent = {
  label: string;
  component: React.ReactNode;
};
export type TabsProps = {
  contents: TabContent[];
};
export const Tabs = ({contents}: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.tabsContainer}>
      <HStack style={styles.row}>
        {contents.map((tabContent, index) => (
          <TouchableWithoutFeedback onPress={() => setSelectedTab(index)}>
            <View
              style={[
                styles.tabsLabel,
                selectedTab === index && styles.active,
              ]}>
              <AppText
                style={[
                  styles.tabsLabelText,
                  selectedTab === index && styles.activeText,
                ]}>
                {tabContent.label}
              </AppText>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </HStack>
      <View style={styles.tabContent}>{contents[selectedTab].component}</View>
    </View>
  );
};
