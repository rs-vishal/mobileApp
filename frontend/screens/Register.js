import React, { useState } from "react";
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
import axios from "axios";
import { API_URL } from "@env";

export default function Register({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [ShowConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Name validation
    if (!form.name) {
      newErrors.name = "Name is required.";
      valid = false;
    }

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
    } else if (form.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters.";
      valid = false;
    }

    // Confirm Password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
      valid = false;
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      console.log("Sending data:", form); // Log form data
      const response = await axios.post(`${API_URL}/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      console.log("Response:", response); // Log response
      if (response.status === 201) {
        Alert.alert("Success", "Registration successful!");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error:", error); // Log error details
      if (error.response && error.response.status === 409) {
        Alert.alert("Error", "User already exists!");
      } else {
        Alert.alert("Error", "Something went wrong!");
      }
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
          <Text style={styles.companyname}>companyname</Text>
          <Text style={styles.title}>Create an account</Text>
        </View>

        <View style={styles.form}>
          {/* Name Input */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(name) => setForm({ ...form, name })}
              placeholder="UserName"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.name}
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
          </View>

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
                style={styles.inputControl}
                value={form.password}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Icon
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          {/* Confirm Password Input */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                autoCorrect={false}
                secureTextEntry={!ShowConfirmPassword} // Toggle visibility based on `ShowConfirmPassword`
                onChangeText={(confirmPassword) =>
                  setForm({ ...form, confirmPassword })
                }
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.confirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!ShowConfirmPassword)}
                style={styles.eyeButtonconform}
              >
                <Icon
                  name={ShowConfirmPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
          </View>

          {/* Sign up Button */}
          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleRegister}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.formFooter}>
          Already have an account?{" "}
          <Text style={{ textDecorationLine: "underline", color: "blue" }}>
            Log in
          </Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: -70,
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 70,
    marginTop: 10,
    top: 20,
    alignSelf: 'center',
    marginBottom: 36,
  },
  companyname: {
    width: 100,
    height: 40,
    fontSize: 15,
    alignSelf: 'center',
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 14,
    marginTop: -64,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: "#075eec",
    borderRadius: 12,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    top:14,
  },
  eyeButtonconform: {
    position: "absolute",
    right: 15,
    top:14,
  },
});
