import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity, Alert, Modal, TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListingType } from "@/types/listingType";
import { FontAwesome5, Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get('window');

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<ListingType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const bookmarksData = await AsyncStorage.getItem('bookmarks');
        if (bookmarksData) {
          setBookmarks(JSON.parse(bookmarksData));
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchBookmarks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const updatedBookmarks = bookmarks.filter(item => item.id !== id);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
      Alert.alert("Başarılı!", "Silindi.");
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  const calculateTotalPrice = () => {
    return bookmarks.reduce((total, item) => total + parseFloat(item.price.replace(/[^0-9.-]+/g, '')), 0).toFixed(2);
  };

  const validateCardNumber = (number: string) => {
    return /^\d{16}$/.test(number);
  };

  const validateExpiryDate = (date: string) => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(date);
  };

  const validateCvv = (cvv: string) => {
    return /^\d{3}$/.test(cvv);
  };

  const handlePayment = async () => {
    let errorMessage = '';

    // Validate input fields
    if (!cardNumber && !expiryDate && !cvv) {
      errorMessage = 'Kart numarası, son kullanma tarihi ve CVV boş olamaz.';
    } else if (!cardNumber) {
      errorMessage = 'Kart numarası boş olamaz.';
    } else if (!validateCardNumber(cardNumber)) {
      errorMessage = 'Kart numarası 16 haneli olmalıdır.';
    } else if (!expiryDate) {
      errorMessage = 'Son kullanma tarihi boş olamaz.';
    } else if (!validateExpiryDate(expiryDate)) {
      errorMessage = 'Son kullanma tarihi MM/YY formatında olmalıdır.';
    } else if (!cvv) {
      errorMessage = 'CVV boş olamaz.';
    } else if (!validateCvv(cvv)) {
      errorMessage = 'CVV 3 haneli olmalıdır.';
    } else if (!cardNumber || !expiryDate || !cvv) {
      if (!cardNumber) {
        errorMessage = 'Kart numarası boş olamaz.';
      } else if (!expiryDate) {
        errorMessage = 'Son kullanma tarihi boş olamaz.';
      } else if (!cvv) {
        errorMessage = 'CVV boş olamaz.';
      }
    }

    if (errorMessage) {
      Alert.alert('Geçersiz Bilgi!', errorMessage);
      return;
    }

    // Placeholder for payment processing logic
    Alert.alert('Ödeme Başarılı!', 'Ödemeniz başarıyla gerçekleşti.');

    try {
      // Clear bookmarks from AsyncStorage
      await AsyncStorage.removeItem('bookmarks');
      setBookmarks([]);
    } catch (error) {
      console.error('Error clearing bookmarks:', error);
    }

    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
    // Optionally, navigate back to bookmarks page if needed
  };

  const handleExpiryDateChange = (text: string) => {
    // Remove non-numeric characters except '/'
    let formattedText = text.replace(/[^0-9/]/g, '');

    // Add '/' after the month part
    if (formattedText.length > 2 && formattedText[2] !== '/') {
      formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2)}`;
    }

    setExpiryDate(formattedText);
  };

  const renderItem = ({ item }: { item: ListingType }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.info}>
          <FontAwesome5 name="map-marker-alt" size={18} color={'#20B2AA'} />
          <Text style={styles.location}>{item.location}</Text>
        </View>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
        <Ionicons name="trash-outline" size={25} color="#20B2AA" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <Feather name='arrow-left' size={20} color='white' />
        </TouchableOpacity>
        <Text style={styles.titleText}>Kaydedilenler</Text>
      </View>
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Toplam Tutar : <Text style={styles.moneyTxt}>₺</Text>{calculateTotalPrice()}</Text>
     <TouchableOpacity style={styles.paymentBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.paymentText}>Ödeme Yap</Text>
        </TouchableOpacity>
      </View>

      {/* Ödeme Modal'ı */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Kart Bilgileri</Text>
            <TextInput
              style={styles.input}
              placeholder="Kart Numarası (16 Haneli)"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={16}
            />
            <TextInput
              style={styles.input}
              placeholder="Son Kullanma Tarihi (MM/YY)"
              value={expiryDate}
              onChangeText={handleExpiryDateChange}
              keyboardType="numeric"
              maxLength={5}
            />
            <TextInput
              style={styles.input}
              placeholder="CVV (3 Haneli)"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              maxLength={3}
            />
            <View style={styles.modalButtons}>
              <Button title="Ödeme Yap" onPress={handlePayment} color="#20B2AA" />
              <Button title="İptal" onPress={handleCancel} color="black" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  headerBtn: {
    padding: 10,
    backgroundColor: '#20B2AA',
    borderRadius: 50,
    marginLeft:-24,
    elevation:6
  },
  titleText: {
    top:-6,
    marginRight:80,
    fontSize: 25,
    fontWeight: '600',
    color: '#20B2AA',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#20B2AA',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    marginLeft: 5,
    color: 'black',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#20B2AA',
    marginTop: 5,
  },
  deleteBtn: {
    padding: 10,
  },
  footer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#20B2AA',
  },
  moneyTxt:{
    color:'red'
  },
  paymentBtn: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#20B2AA',
    borderRadius: 10,
  },
  paymentText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.9,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    color:'#20B2AA',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#20B2AA',
    borderRadius: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    borderRadius:30,
  },
});

export default Bookmarks;
