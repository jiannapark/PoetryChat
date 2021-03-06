import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
// import {getPoems} from '../firebase';

const DATA = [
  {
    id: '',
    title: 'Poem 1',
  },
  {
    id: '',
    title: 'Poem 2',
  },
  {
    id: '',
    title: 'Poem 3',
  },
];

const Item = ({item, onPress}) => (
  <View style={styles.item}>
    <TouchableOpacity onPress={onPress} style={styles.touchable}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  </View>
);

export default function PoemList(props) {
  // const [roomId, userId] = props.navigation.state.params;
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    return (
      <Item
        title={item.title}
        onPress={() => setSelectedId(item.id)}
        style={{backgroundColor}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  touchable: {
    backgroundColor: 'pink',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 30,
  },
});
