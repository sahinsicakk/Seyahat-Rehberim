import { View,Text } from "react-native"
import React from "react"
import { Tabs } from "expo-router"
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { Colors } from "react-native/Libraries/NewAppScreen"

export default function Layout() {
return(
    <Tabs screenOptions={{
        tabBarStyle:{
            backgroundColor:'#F5F5F5',
            borderBottomWidth:0,
            padding:0
        },
        tabBarShowLabel:false,
        tabBarActiveTintColor:'black',
        tabBarInactiveTintColor:'#999'
    }}>
        <Tabs.Screen name = 'index' options={{tabBarIcon: ({color}) =>(
            <Ionicons name="compass" size={35} color="#20B2AA"/>
        )}} />
       



        <Tabs.Screen name = 'bookmarks' options={{tabBarIcon: ({color}) =>(
            <Ionicons name="bookmarks" size={24} color="#696969"/>
        )}}  />
       
        <Tabs.Screen name = 'Profil' options={{tabBarIcon: ({color}) =>(
            <FontAwesome name="user" size={35} color="#696969"/>
        )}}  />
    </Tabs>
)
}