import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [inputText, setInputText] = useState('');
  const [dataArray, setDataArray] = useState([]);

  const handleAddText = () => {
    setDataArray(prevDataArray => [...prevDataArray, inputText]);
    setInputText('');
  };

  const DATA = [
    {
      key: "Manchester United",
    },
    {
      key: "Liverpool",
    },
    {
      key: "Barca",
    },
    {
      key: "Real Madrid",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headline}>
        <Text style={styles.headlineText}>Nu gör vi en lista!</Text>
      </View>

      <View style={styles.listView}>
        <FlatList
          data={dataArray}
          renderItem={({ item }) => (
            <Text style={styles.listText}>{item}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={text => setInputText(text)}
          value={inputText}
          placeholder="Skriv här"
          keyboardType="numeric"
        />
      </View>
      <Button
        title="Lägg till"
        onPress={handleAddText}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    flex: 1,
    justifyContent: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  headlineText: {
    fontSize: 40,
  },
  listView: {
    flex: 2,
    paddingTop: 60,
    justifyContent: "center",
  },
  listText: {
    fontSize: 20,
    justifyContent: "center",
    padding: 5,
  },
  input: {
    width: 200,
    height: 40,
    margin: 20,
    borderWidth: 4,
    padding: 10,
  },
});
