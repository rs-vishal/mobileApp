import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const services = [
  { name: "Airtel", image: require("../assets/airtel.png") },
  { name: "BSNL - Special Tariff", image: require("../assets/bsnl.png") },
  { name: "BSNL - Talktime", image: require("../assets/bsnl.png") },
  { name: "Idea", image: require("../assets/idea.png") },
  { name: "Reliance Jio", image: require("../assets/jio.png") },
  { name: "Vi Prepaid", image: require("../assets/vi.png") },
];

const specialServices = [
  { name: "Airtel", image: require("../assets/airtel.png") },
  { name: "Reliance Jio", image: require("../assets/jio.png") },
];

const Service = () => {
  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <TouchableOpacity
        onPress={() => Alert.alert(`${item.name} pressed!`)}
      >
        <Image source={item.image} style={styles.serviceImage} />
        <View style={styles.titleContainer}>
          <Text style={styles.serviceText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      {/* Top Bar */}
      <View style={styles.topBar}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
        <Text style={styles.topBarText}>Service Provider</Text>
        <MaterialIcons name="search" size={24} color="white" />
      </View>

      {/* Service Providers List */}
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.name}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
      />

      {/* Special Recharge Networks */}
      <Text style={styles.sectionTitle}>
        Special Recharge Networks (Margin Low)
      </Text>
      <FlatList
        data={specialServices}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.name}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  topBar: {
    backgroundColor: "#03e7fc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  topBarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  balanceText: {
    color: "white",
    fontSize: 16,
  },
  serviceItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    elevation: 5,
  },
  serviceImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  serviceText: {
    textAlign: "center",
    fontSize: 16,
  },
  row: {
    justifyContent: "space-around",
  },
  listContainer: {
    paddingBottom: 20,
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: 18,
    color: "red",
    marginVertical: 10,
  },
  
});

export default Service;
