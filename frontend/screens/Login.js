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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios"; 
import { API_URL } from '@env';

export default function Login({ navigation }) { 
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    let errors = { email: "", password: "" };

    // Email Validation
    if (!form.email) {
      errors.email = "Email is required!";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Please enter a valid email!";
      valid = false;
    }

    // Password Validation
    if (!form.password) {
      errors.password = "Password is required!";
      valid = false;
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters!";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      const response = await axios.post(`${API_URL}/login`, form); 
      if (response.status === 200) {
        Alert.alert("Success", "Login successful!");
        navigation.navigate("Login");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert("Error", "Invalid credentials!");
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
          <Text style={styles.title}>Login in</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={(email) => setForm({ ...form, email })}
              placeholder="example@email.com"
              placeholderTextColor="#6b7280"
              style={[styles.inputControl, formErrors.email && { borderColor: 'red' }]}
              value={form.email}
            />
            {formErrors.email ? (
              <Text style={styles.errorText}>{formErrors.email}</Text>
            ) : null}
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(password) => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={[styles.inputControl, formErrors.password && { borderColor: 'red' }]}
              secureTextEntry={true}
              value={form.password}
            />
            {formErrors.password ? (
              <Text style={styles.errorText}>{formErrors.password}</Text>
            ) : null}
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleLogin}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Login in</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              // handle forgot password
            }}
          >
            <Text style={styles.formLink}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.formFooter}>
          Don't have an account?{" "}
          <Text style={{ textDecorationLine: "underline", color: "blue" }}>
            Sign up
          </Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  /** Header */
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 70,
    marginTop: 10,
    top: 20,
    alignSelf: "center",
    marginBottom: 36,
  },
  companyname: {
    width: 100,
    height: 40,
    fontSize: 15,
    alignSelf: "center",
  },
  /** Form */
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
  formLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#075eec",
    textAlign: "center",
  },
  formFooter: {
    
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
