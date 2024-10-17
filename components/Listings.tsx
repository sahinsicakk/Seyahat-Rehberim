import { Image, TextInput, TouchableOpacity, FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListingType } from 'types/listingType';
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";

type Props = {
    listings: ListingType[];
    category: string;
};

const Listings = ({ listings, category }: Props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        // Simulate data fetching
        const timer = setTimeout(() => {
            setLoading(false);
        }, 200);

        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, [category]);

    const renderItem: ListRenderItem<ListingType> = ({ item }) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.item}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <Text style={styles.itemTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                    <View style={styles.infoWrapper}>
                        <View style={styles.locationWrapper}>
                            <FontAwesome5 name="map-marker-alt" size={18} color='#20B2AA' />
                            <Text style={styles.itemLocation}>{item.location}</Text>
                        </View>
                        <Text style={styles.itemPriceTxt}>{item.price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View>
            <FlatList
                data={loading ? [] : listings}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default Listings;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#D3D3D3',
        padding: 10,
        borderRadius: 10,
        marginRight: 20,
        width: 220,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    itemTxt: {
        fontSize: 16,
        fontWeight: '800',
        color: '#20B2AA',
        marginBottom: 10,
        marginTop: 6,
    },
    infoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemLocation: {
        fontSize: 12,
        marginLeft: 5,
    },
    itemPriceTxt: {
        fontSize: 13,
        fontWeight: '600',
        color: '#20B2AA',
    }
});
