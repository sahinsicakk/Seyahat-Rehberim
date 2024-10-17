import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native'; // useNavigation eklenmiş
import { Feather, Ionicons, FontAwesome5 } from "@expo/vector-icons";

const ProfilScreen = () => {
    const navigation = useNavigation(); // Navigation objesi
    // State'ler
    const [username, setUsername] = useState("sahinsicakk");
    const [age, setAge] = useState("24");
    const [gender, setGender] = useState("Erkek");
    const [birthDate, setBirthDate] = useState("05/01/2000");
    const [email, setEmail] = useState("sahinsicakk@gmail.com");
    const [phone, setPhone] = useState("+905312722567");
    const [city, setCity] = useState("Wolfsburg");
    const [editing, setEditing] = useState(false);

    // Değişim fonksiyonları
    const handleSave = () => {
        // Burada değişiklikleri kaydedebilir ve/veya bir API çağrısı yapabilirsiniz
        setEditing(false);
        Alert.alert("Değişiklikler Kaydedildi!");
    };

    const handleEdit = () => {
        setEditing(true);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => navigation.goBack()} // Geri gitme işlevi
                style={styles.backButton}
            >
               
                    <Feather name='arrow-left' size={20} color={'white'}/>
            </TouchableOpacity>
            <Image
                source={require('@/assets/images/me.png')}
                style={styles.profileImage}
            />
            {editing ? (
                <>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Kullanıcı Adı"
                    />
                    <TextInput
                        style={styles.input}
                        value={age}
                        onChangeText={setAge}
                        placeholder="Yaş"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        value={gender}
                        onChangeText={setGender}
                        placeholder="Cinsiyet"
                    />
                    <TextInput
                        style={styles.input}
                        value={birthDate}
                        onChangeText={setBirthDate}
                        placeholder="Doğum Tarihi"
                    />
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="E-posta"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Telefon"
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        style={styles.input}
                        value={city}
                        onChangeText={setCity}
                        placeholder="Şehir"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Kaydet</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.username}>{username}</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Yaş:</Text>
                        <Text style={styles.info}>{age}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Cinsiyet:</Text>
                        <Text style={styles.info}>{gender}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Doğum Tarihi:</Text>
                        <Text style={styles.info}>{birthDate}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>E-posta:</Text>
                        <Text style={styles.info}>{email}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Telefon:</Text>
                        <Text style={styles.info}>{phone}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Şehir:</Text>
                        <Text style={styles.info}>{city}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleEdit}>
                        <Text style={styles.buttonText}>Düzenle</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default ProfilScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        padding: 10,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        backgroundColor: '#20B2AA',
        padding: 10,
        borderRadius: 50,
        elevation: 5,
    },
    profileImage: {
        width: 180,
        height: 180,
        borderRadius: 90,
        marginBottom: 20,
    },
    username: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#20B2AA',
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        width: '80%',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 18,
        color: '#20B2AA',
        fontWeight: 'bold',
    },
    info: {
        fontSize: 16,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#20B2AA',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        width: '80%',
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#20B2AA',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
