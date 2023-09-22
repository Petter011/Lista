import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [inputText, setInputText] = useState("");
  const [dataArray, setDataArray] = useState([]);

  const handleAddText = () => {
    const updatedArray = [...dataArray, inputText];
    setDataArray(updatedArray);
    saveData(updatedArray);
    setInputText("");
  };

  const handleRemoveItem = (index) => {
    const updatedArray = dataArray.filter((item, idx) => idx !== index);
    setDataArray(updatedArray);
    saveData(updatedArray);
  };

  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem("listData", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem("listData");
      if (data !== null) {
        setDataArray(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error loading data: ", error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headline}>
        <Text style={styles.headlineText}>Nu gör vi en lista!</Text>
        <Text style={styles.undertext}>
          Skriv i rutan så läggs de till i listan!
        </Text>
      </View>

      <View style={styles.listView}>
        <FlatList
          data={dataArray}
          renderItem={({ item }) => <Text style={styles.listText}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <KeyboardAwareScrollView>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setInputText(text)}
            value={inputText}
            placeholder="Skriv här"
            keyboardType="default"
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.buttonRow}>
        <Button title="Ta bort" color="red" onPress={handleRemoveItem} />
        <Button title="Lägg till" color="blue" onPress={handleAddText} />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    flex: 1,
    justifyContent: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  headlineText: {
    fontSize: 40,
  },
  undertext: {
    fontSize: 20,
    padding: 5,
  },
  listView: {
    flex: 4,
    paddingTop: 60,
    justifyContent: "center",
    backgroundColor: "#9df5ab",
    width: 300,
    borderRadius: 35,
    alignItems: "center",
    borderWidth: 1,
  },
  listText: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  input: {
    width: 250,
    height: 50,
    margin: 20,
    borderWidth: 3,
    padding: 10,
    backgroundColor: "#c9f5d0",
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
