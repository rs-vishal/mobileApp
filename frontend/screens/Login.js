import React, { useContext, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UserContext } from "../context/Appcontext";
import axios from "axios";
import { API_URL } from "@env";

export default function Login({ navigation }) {
  const { handleLogin } = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      email: "",
      password: "",
    };

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!form.email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!emailPattern.test(form.email)) {
      newErrors.email = "Please enter a valid email.";
      valid = false;
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLoginPress = async () => {
    if (!validateForm()) {
      return;
    }   
    try {
      const response = await axios.post(`${API_URL}/login`, form);
      console.log("Response:", response);
      
      // Check for successful login
      if (response.status === 200) { // Ensure status code is 200 for success
        await handleLogin(form.email); // Correctly pass the email
        navigation.navigate("Service", { successMessage: "Login successful!" });        
      } else {
        Alert.alert("Error", "Invalid credentials!"); // Handle other status codes if necessary
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Error", "Something went wrong!"); // Notify user of the error
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={{
              uri: "https://imgs.search.brave.com/PLEkY9e9vceZZK9SluNtb51d2cq4dy0c73GVmY0LnwI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90ZW1w/bGF0ZS5jYW52YS5j/b20vRUFFRkg5V0k0/YWMvMS8wLzQwMHct/RjRRQm1Bc2JpUjQu/anBn",
            }}
          />
          <Text style={styles.companyname}>Company Name</Text>
          <Text style={styles.title}>Log in to your account</Text>
        </View>

        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(email) => setForm({ ...form, email })}
              placeholder="example@email.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          {/* Password Input */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                autoCorrect={false}
                secureTextEntry={!showPassword} // Toggle visibility based on `showPassword`
                onChangeText={(password) => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={[styles.inputControl, { flex: 1 }]}
                value={form.password}
              />
              <TouchableOpacity
                style={{ padding: 8 }}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon name={showPassword ? "eye" : "eye-off"} size={20} />
              </TouchableOpacity>
            </View>
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLoginPress}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Log in</Text>
          </TouchableOpacity>

          {/* Register Redirect */}
          <View style={styles.redirectContainer}>
            <Text style={styles.redirectText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.redirectLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  headerImg: {
    height: 60,
    width: 60,
  },
  companyname: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 8,
  },
  title: {
    fontSize: 16,
    marginTop: 8,
  },
  form: {
    marginTop: 40,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 8,
    color: "#6b7280",
  },
  inputControl: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 6,
    borderColor: "#d1d5db",
    borderWidth: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#d1d5db",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: "#374151",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  redirectContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  redirectText: {
    color: "#6b7280",
  },
  redirectLink: {
    color: "#1f2937",
    fontWeight: "bold",
  },
});
