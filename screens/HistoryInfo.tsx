import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, ColorSchemeName, Pressable, ScrollView } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import { Text, View } from '../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import useColorScheme from '../hooks/useColorScheme';
import { useEffect, useState } from 'react';
import { getWordHistory, getWordHistoryByLocation, openDatabase } from '../db';
export default function HistoryInfo({ navigation, path }: { navigation: any, path: string }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      console.log('history');
      const db = await openDatabase();
      let wordHistory = await getWordHistoryByLocation(db);
      setData(wordHistory);
    })();
  }, [])
  console.log('wordHistory', data);
  return (
    <ScrollView>
      {!!data && data.length != 0 && data.map((value: any, key: any) => {
        return (
          <Pressable
            key={key}
            onPress={() => {
              navigation.navigate('Modal',{value: value.word})
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}>
            <Text key={key} style={(key%2==0)? styles.getStartedText : styles.getStartedTextOdd}>
              {value.word}
            </Text>
          </Pressable>)
      })}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    marginBottom: 20

  },
  getStartedTextOdd: {
    backgroundColor: 'grey',
    color: 'black',
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    marginBottom: 20

  },
});
