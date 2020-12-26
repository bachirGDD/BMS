//This is an example code for Navigator// 
import { ListItem, Avatar } from 'react-native-elements'
import MultiSelect from 'react-native-multiple-select';
import React, { Component, useState, useEffect, useRef } from 'react';
//import react in our code. 
import { StyleSheet, View, Text, TextInput, FlatList, SearchBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView, { Marker } from "react-native-maps";


function ResellerListScreen() {

    const [resellers, setResellers] = useState([]);

    useEffect(() => {
        fetch("http://bms.digitalteam-dz.com/bms_resellers")
            .then(res => res.json())
            .then(data => { setResellers(data.data) });
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 36.74006256716587,
                    longitude: 3.09795433878562,
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003
                }}>
                {resellers.map((reseller) => <MapView.Marker key={reseller.id}
                    coordinate={{
                        latitude: parseFloat(reseller.reseller_location.split(',')[0]),
                        longitude: parseFloat(reseller.reseller_location.split(',')[1])
                    }}
                    title={reseller.first_name + " " + reseller.last_name}
                    description={reseller.reseller_phone}
                />)}
            </MapView>

        </View>
    )
}

function AddResellerScreen() {
    const [value, setValue] = useState(0);
    return (
        <View style={styles.container}>

                <StatusBar style="auto" />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="activité "
                        placeholderTextColor="#778284"
                        textAlign="center"
                      
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="First name"
                        placeholderTextColor="#778284"
                        secureTextEntry={true}
                        
                    />

                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Last name"
                        placeholderTextColor="#778284"
                        secureTextEntry={true}
                        
                    />

                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder=" remarques"
                        placeholderTextColor="#778284"
                        secureTextEntry={true}
                       
                    />

                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Reseller email"
                        placeholderTextColor="#778284"
                        secureTextEntry={true}
                        
                    />

                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Reseller location"
                        placeholderTextColor="#778284"
                        secureTextEntry={true}
                        //onChangeText={(password) => setPassword(password)}
                    />

                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="reseller phone"
                        placeholderTextColor="#778284"
                        secureTextEntry={true}
                        //onChangeText={(password) => setPassword(password)}
                    />

                </View>
        </View>


    );
}
   
function AddProductScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>settings</Text>
        </View>
    );}

  
    function AddAgentScreen() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
            </View>
        );
    }
    function ProductListScreen() {
        const [products, setProducts] = useState([]);
        useEffect(() => {
            fetch("http://bms.digitalteam-dz.com/bms_products")
                .then(res => res.json())
                .then(data => { setProducts(data.data) });
        }, [])
        const renderHeader = () => {
            return (
                <SearchBar
                    placeholder="Type Here..."
                    lightTheme
                    round
                    onChangeText={text => this.searchFilterFunction(text)}
                    autoCorrect={false}
                />
            );
        };
        const renderSeparator = () => {
            return (
                <View
                    style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#000",
                    }}
                />
            );
        };
        const searchFilterFunction = text => {
            const newData = products.filter(item => {
                const itemData = item.product_name.toUpperCase()


                const textData = text.toUpperCase();

                return itemData.indexOf(textData) > -1;
            });

            setProducts(newData);
            console.log(newData)
        };
        return (
            <View>
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <ListItem bottomDivider>
                            <Avatar source={{ uri: item.img_link }} />
                            <ListItem.Content>
                                <ListItem.Title>{item.product_name}</ListItem.Title>
                                <ListItem.Subtitle>{item.product_description}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>)}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={renderSeparator}
                />
            </View>
        );
    }
    export default function SecondPage(props) {
        const { navigate } = props.navigation;
        const Tab = createBottomTabNavigator();
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Resellers" component={ResellerListScreen} />
                    <Tab.Screen name="Add Reseller" component={AddResellerScreen} />
                    <Tab.Screen name="Products" component={ProductListScreen} />
                    <Tab.Screen name="Add Products" component={AddProductScreen} />
                    <Tab.Screen name="Add Agents" component={AddAgentScreen} />
                </Tab.Navigator>
            </NavigationContainer>
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