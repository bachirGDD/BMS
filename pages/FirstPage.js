import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    ToastAndroid
} from "react-native";
//import MapView from 'react-native-maps';

 export default function FirstPage (props){
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [role, setRole] = useState("");
     const [error, setError] = useState("")

     const getRole = (e, p) => {
         fetch("http://bms.digitalteam-dz.com/bms_user/" + "?username=" + e + "&password=" + p)
             .then((response) => { return response.json() })
             .then((json) => {
                 if (typeof json.role !== 'undefined') {
                     setRole(json.role)

                     //console.log("role ->" + json.role)
                     if (json.role==="Admin"){
                         navigate('Admin')
                         setError("")
                     }
                     else{
                         navigate('Agent')
                         setError("")
                     }

                 }
                 else {
                     setError(json.error)
                     setRole("")

                 }
             })
             .catch((error) => { console.error(error); });

     }
    const navigationOptions = {
        title: 'First Page',
        //Sets Header text of Status Bar
        headerStyle: {
            backgroundColor: '#f4511e',
            //Sets Header color
        },
        headerTintColor: '#fff',
        //Sets Header text color
        headerTitleStyle: {
            fontWeight: 'bold',
            //Sets Header text style
        },
    };
    const { navigate } = props.navigation;
    return(


            <View style={styles.container}>
                <Image style={styles.image} source={require("../assets/BMS.png")} />

                <StatusBar style="auto" />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email or username *"
                        placeholderTextColor="#778284"
                        textAlign="center"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#778284"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />

                </View>



                <TouchableOpacity style={styles.loginBtn} onPress={() => getRole(email, password)}>
                    <Text>LOGIN</Text>
                </TouchableOpacity>
                <Text style={error !== "" ? styles.error : { display: "none" }}>{error}</Text>

            </View>
        );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#006479",
        alignItems: "center",
        justifyContent: "center",

    },

    image: {
        marginBottom: 80,
    },

    inputView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        color: "black",
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,

    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FFDD2D",
    },
    error: {
        width: "100%",
        //borderRadius: 25,
        height: 30,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#ad4e58",
    }
});
