import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ListingType } from "@/types/listingType";
import ListingData from "@/data/destination.json"
import { Feather, Ionicons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const ListingDetails = () => {
  const { id } = useLocalSearchParams();
  const listing: ListingType | undefined = (ListingData as ListingType[]).find(
    (item) => item.id === id
  );

  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const bookmarks = await AsyncStorage.getItem('bookmarks');
        const bookmarkedItems = bookmarks ? JSON.parse(bookmarks) : [];
        const isBookmarked = bookmarkedItems.some((item: ListingType) => item.id === id);
        setIsBookmarked(isBookmarked);
      } catch (error) {
        console.error('Error checking bookmarks:', error);
      }
    };

    checkBookmark();
  }, [id]);

  const handleBookmark = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarks');
      const bookmarkedItems = bookmarks ? JSON.parse(bookmarks) : [];
      const isAlreadyBookmarked = bookmarkedItems.some((item: ListingType) => item.id === id);

      if (isAlreadyBookmarked) {
        Alert.alert( `${listing?.name} Zaten Kaydedildi. `);
        
        return;
      }

      bookmarkedItems.push(listing);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarkedItems));
      setIsBookmarked(true);

      Alert.alert(
        "Başarılı!",
        `${listing?.name} kaydedildi.`,
        [{ text: "ok", onPress: () => router.push('/bookmarks') }]
      );
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  if (!listing) {
    return <Text>Liste bulunamadı.</Text>;
  }

  return (
    <>
      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
            <View style={styles.headerIcon}>
              <Feather name='arrow-left' size={20} color={'white'} />
            </View>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={handleBookmark} style={styles.headerBtn}>
            <View style={styles.headerIcon}>
              <Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={20} color={'white'} />
            </View>
          </TouchableOpacity>
        ),
      }} />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Image source={{ uri: listing.image }} style={styles.image} />
          <View style={styles.contentWrapper}>
            <Text style={styles.listingName}>{listing.name}</Text>
            <View style={styles.listingLocationWrapper}>
              <FontAwesome5 name="map-marker-alt" size={18} color={'#20B2AA'} />
              <Text style={styles.listingLocationTxt}>{listing.location}</Text>
            </View>
            <View style={styles.highlightWrapper}>
              <View style={styles.highlightItem}>
                <View style={styles.highlightIcon}>
                  <Ionicons name="time" size={18} color={'#20B2AA'} />
                </View>
                <View>
                  <Text style={styles.highlightTxt}>Süre:</Text>
                  <Text style={styles.highlightTxtVl}>{listing.duration} Gün</Text>
                </View>
              </View>
              <View style={styles.highlightItem}>
                <View style={styles.highlightIcon}>
                  <FontAwesome5 name="users" size={18} color={'#20B2AA'} />
                </View>
                <View>
                  <Text style={styles.highlightTxt}>Kişi:</Text>
                  <Text style={styles.highlightTxtVl}>{listing.duration} Kişi</Text>
                </View>
              </View>
              <View style={styles.highlightItem}>
                <View style={styles.highlightIcon}>
                  <Ionicons name="star" size={18} color={'#20B2AA'} />
                </View>
                <View>
                  <Text style={styles.highlightTxt}>Reyting:</Text>
                  <Text style={styles.highlightTxtVl}>{listing.rating} Yıldız</Text>
                </View>
              </View>
            </View>
            <Text style={styles.listingDetails}>{listing.description}</Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleBookmark} style={[styles.footerBtn, styles.footerBookBtn]}>
          <Text style={styles.footerBtnTxt}>Hemen Kaydet</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.footerBtn}>
          <Text style={styles.footerBtnTxt}>{listing.price}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    paddingBottom: 150,
  },
  image: {
    width: width,
    height: IMG_HEIGHT,
  },
  contentWrapper: {
    padding: 20,
  },
  listingName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#20B2AA',
    letterSpacing: 0.5,
    marginLeft: 10,
  },
  listingLocationWrapper: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  listingLocationTxt: {
    fontSize: 14,
    marginLeft: 10,
    color: 'black',
  },
  highlightWrapper: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  highlightItem: {
    flexDirection: 'row',
  },
  highlightIcon: {
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 5,
    alignItems: 'center',
  },
  highlightTxt: {
    fontSize: 12,
    color: '#999',
  },
  highlightTxtVl: {
    fontSize: 14,
    fontWeight: '600',
  },
  listingDetails: {
    marginLeft: 5,
    top: 20,
    fontSize: 16,
    color: 'black',
    lineHeight: 25,
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    padding: 20,
    paddingBottom: 30,
    width: width,
  },
  footerBtn: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  footerBtnTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  footerBookBtn: {
    flex: 2,
    backgroundColor: '#20B2AA',
    marginRight: 20,
  },
  headerBtn: {
    backgroundColor: '#20B2AA',
    padding: 10,
    borderRadius: 50,
  },
  headerIcon: {
    padding: 5,
  },
});

export default ListingDetails;
