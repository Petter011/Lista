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
  TouchableOpacity,
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

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headline}>
        <Text style={styles.headlineText}> </Text>
      </View>

      <View style={styles.listView}>
        <FlatList
          data={dataArray}
          renderItem={({ item, index }) => (
            <View style={styles.listItem}>
              <Text style={styles.listText}>{item}</Text>
              <Button
                title="Remove"
                color="red"
                onPress={() => handleRemoveItem(index)}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>

      <KeyboardAwareScrollView>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setInputText(text)}
            value={inputText}
            placeholder="Kom ihåg"
            keyboardType="default"
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.buttonRow}>
        <Button title="Lägg till" color="black" onPress={handleAddText} />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    fontSize: 30,
    fontWeight: "bold",
  },
  listView: {
    flex: 4,
    paddingTop: 60,
    //justifyContent: "center",
    backgroundColor: "white",
    width: 300,
    borderRadius: 35,
    //alignItems: "center",
    borderWidth: 1,
    shadowRadius: 10,
    shadowOpacity: 10,
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
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 10,
  },
  buttonRow: {
    flexDirection: "row",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});
