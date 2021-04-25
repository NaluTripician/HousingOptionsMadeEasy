import { StatusBar } from "expo-status-bar";
import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Pressable
} from "react-native";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBebWuH7osJsfklBZvzzaAPP-Eh5M0Dhdo",
  authDomain: "housingoptionsmadeeasy.firebaseapp.com",
  projectId: "housingoptionsmadeeasy",
  storageBucket: "housingoptionsmadeeasy.appspot.com",
  messagingSenderId: "252883817571",
  appId: "1:252883817571:web:c75158a40c5fecf71e5456",
  measurementId: "G-13PEBSKEJJ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function emailSignUp (email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        //something
    var user = userCredential.user;
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    })
};

function emailLogin (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        console.log("peepee")
    var user = userCredential.user;
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    })
};

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [page, setPage] = useState("main")

    if(page === 'main') {
        return (
            <SafeAreaView>
            <View style={styles.container}>
                <Image style={styles.image} source={require("../assets/home_logo.png")} />
                <StatusBar style="auto" />

                <Pressable style={styles.loginBtn} onPress={page => setPage("login")}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </Pressable>

                <Pressable style={styles.loginBtn} onPress={page => setPage("signup")}>
                    <Text style={styles.loginText}>SIGN UP</Text>
                </Pressable>

            </View>
            </SafeAreaView>
        );
    } else if(page === 'login') {
        return (
            <SafeAreaView>
            <View style={styles.container}>
                <Image style={styles.image} source={require("../assets/home_logo.png")} />
                <StatusBar style="auto" />
                <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={email => setEmail(email)}
                />
                </View>

                <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={password => setPassword(password)}
                />
                </View>

                <TouchableOpacity>
                    <Text style={styles.forgot_button}>Forgot Password?</Text>
                </TouchableOpacity>

                <Pressable style={styles.loginBtn} onPress={() => emailLogin(email, password)}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </Pressable>
            </View>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView>
            <View style={styles.container}>
                <Image style={styles.image} source={require("../assets/icon.png")} />
                <StatusBar style="auto" />
                <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={email => setEmail(email)}
                />
                </View>

                <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={password => setPassword(password)}
                />
                </View>

                <Pressable style={styles.loginBtn} onPress={() => emailSignUp(email, password)}>
                    <Text style={styles.loginText}>SIGN UP</Text>
                </Pressable>
            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
     },

     image: {
         height: 200,
         width: 200,
      marginBottom: 50,
      marginTop: 100,
    },

    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },

    TextInput: {
        height: 40,
        fontSize: 14,
        lineHeight: 14,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn:
    {
       width:"80%",
       borderRadius:25,
       height:50,
       alignItems:"center",
       justifyContent:"center",
       marginTop:20,
       backgroundColor:"#D72020",
    }
});
