import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView } from "react-native";
import React, { useState } from 'react';
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import CategoryButtons from "@/components/CategoryButtons";
import Listings from "@/components/Listings";
import listingData from '@/data/destination.json';

const IndexPage = () => {
    const [category, setCategory] = useState('TÜMÜ');
    const [searchTerm, setSearchTerm] = useState('');
    const headerHeight = useHeaderHeight();
    const navigation = useNavigation();

    const onCatChanged = (category: string) => {
        console.log("Kategori:", category);
        setCategory(category);
    };

    const filteredListings = listingData
        .filter(item => category === 'TÜMÜ' || item.category === category)
        .filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerTitle: "",
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Profil')}
                            style={{ marginLeft: 10, top: 25 }}
                        >
                            <Image
                                source={require("@/assets/images/me.png")}
                                style={{ width: 50, height: 50, borderRadius: 25 }}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ marginRight: 10, top: 25 }}
                        >
                            <Image
                                source={require("@/assets/images/G.png")} 
                                style={{ width: 60, height: 60, borderRadius: 30 }}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
            <View style={[styles.container, { paddingTop: headerHeight }]}>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <Text style={styles.headingTxt}>Cennet Dolu Dünyayı Keşfet!</Text>
                    <View style={styles.searchSectionWrapper}>
                        <View style={styles.searchBar}>
                            <Ionicons name="search" size={22} style={{ marginRight: 16 }} color={'#20B2AA'} />
                            <TextInput
                                placeholder="Arama Yap..."
                                value={searchTerm}
                                onChangeText={text => setSearchTerm(text)}
                            />
                        </View>
                    </View>
                    <CategoryButtons onCategoryChanged={onCatChanged} />
                    <Listings listings={filteredListings} category={category} />
                </ScrollView>
            </View>
        </>
    );
};

export default IndexPage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        flex: 1,
        paddingHorizontal: 12,
    },
    headingTxt: {
        fontSize: 30,
        fontWeight: '900',
        color: '#20B2AA',
        marginTop: 20,
        elevation: 5
    },
    searchSectionWrapper: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#C0C0C0',
        padding: 16,
        borderRadius: 15,
        elevation: 5,
    },
    notificationBtn: {
        marginRight: 20,
        backgroundColor: '#20B2AA',
        padding: 10,
        borderRadius: 15,
        elevation: 12,
    },
});
