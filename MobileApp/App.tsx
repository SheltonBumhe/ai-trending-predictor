/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const API_URL = 'http://YOUR_BACKEND_URL/api/auth'; // Replace with your backend URL

function Login({ onAuth }: { onAuth: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.text();
      if (res.ok) {
        // Store JWT (for demo, AsyncStorage is recommended for real apps)
        onAuth();
      } else {
        Alert.alert('Login failed', data);
      }
    } catch (err) {
      Alert.alert('Network error');
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

function Register({ onAuth }: { onAuth: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.text();
      if (res.ok) {
        onAuth();
      } else {
        Alert.alert('Register failed', data);
      }
    } catch (err) {
      Alert.alert('Network error');
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Register</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  if (isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome! You are logged in.</Text>
        <Button title="Logout" onPress={() => setIsLoggedIn(false)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {showLogin ? (
        <>
          <Login onAuth={() => setIsLoggedIn(true)} />
          <Button title="Don't have an account? Register" onPress={() => setShowLogin(false)} />
        </>
      ) : (
        <>
          <Register onAuth={() => setIsLoggedIn(true)} />
          <Button title="Already have an account? Login" onPress={() => setShowLogin(true)} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  form: { width: '100%', maxWidth: 320, marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
});
