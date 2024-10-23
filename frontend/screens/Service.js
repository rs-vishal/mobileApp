import React, { useState, useEffect } from "react";
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
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    navigation.setParams({ triggerSearch: handleSearchToggle });

    if (route.params?.successMessage) {
      setSuccessMessage(route.params.successMessage);

      setTimeout(() => {
        setSuccessMessage(null);
      }, 1000);
    }
  }, [route.params?.successMessage]);

  const handleSearchToggle = () => {
    setSearchVisible(prevState => !prevState);    
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSpecialServices = specialServices.filter((specialServices) =>
    specialServices.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <TouchableOpacity onPress={() => Alert.alert("Service Selected", `${item.name} pressed!`)}>
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

      {/* Show TextInput when search is visible */}
      {isSearchVisible && (
        <TextInput
          style={styles.input}
          placeholder="Type to search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus={true}
          accessibilityLabel="Search services"
        />
      )}

      {/* Service Providers List */}
      <FlatList
        data={filteredServices}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.name}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
      />
      <Text style={styles.sectionTitle}>
        Special Recharge Networks (Margin Low)
      </Text>
      <FlatList
        data={filteredSpecialServices}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.name}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
      />

      {/* Success Message at the bottom */}
      {successMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
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
  input: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  successMessage: {
    position: "absolute",
    bottom: 20, 
    left: 20,   
    right: 20,  
    backgroundColor: "rgba(15, 17, 16, 0.94)", 
    padding: 15,
    zIndex: 10,  
    opacity: 0.7, 
    borderRadius: 20, 
    elevation: 10, 
  },
  successText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  

});

export default Service;
