import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const { width, height } = Dimensions.get('window'); // Mendapatkan dimensi layar

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/b6/db/4c/b6db4c634f67349c289e844ff11c65a4.jpg' }} // Background image URL
      style={styles.background}
    >
      <View style={styles.topSection}>
        {/* Title and Subtitle */}
        <Text style={styles.title}>Selamat Datang di Meal Planner</Text>
        <Text style={styles.subtitle}>Atur waktu makan dan rencana menu Anda.</Text>
      </View>

      <View style={styles.bottomSection}>
        <Button
          title="Lihat Rencana Menu"
          onPress={() => navigation.navigate('MenuPlan')}
          buttonStyle={styles.menuButton}
          titleStyle={styles.buttonTitle}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Membuat background mengambil seluruh layar
    justifyContent: 'center', // Menyusun elemen di tengah secara vertikal
    alignItems: 'center', // Menyusun elemen di tengah secara horizontal
  },
  topSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0, // Menghapus margin yang tidak perlu
    marginBottom: 20, // Menambahkan jarak antara bagian atas dan tombol
    width: '100%', // Menjamin lebar top section sesuai layar
  },
  title: {
    fontSize: width * 0.07, // Ukuran font dinamis berdasarkan lebar layar
    fontWeight: 'bold',
    color: '#FFFFFF', // Mengubah warna teks menjadi putih agar kontras dengan latar belakang
    textAlign: 'center',
    marginBottom: 10, // Jarak antara judul dan subtitle
    textShadowColor: 'rgba(0, 0, 0, 0.6)', // Menambah bayangan di teks untuk meningkatkan kontras
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: width * 0.05, // Ukuran font dinamis untuk subtitle
    color: '#FFFFFF', // Mengubah warna subtitle menjadi putih
    textAlign: 'center',
    marginBottom: 20, // Jarak antara subtitle dan tombol
    textShadowColor: 'rgba(0, 0, 0, 0.4)', // Menambah bayangan di subtitle untuk kontras
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  bottomSection: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Menjamin tombol berada di bagian bawah
    paddingBottom: 40, // Memberikan ruang bawah yang lebih baik
  },
  menuButton: {
    backgroundColor: '#32CD32', // Tombol hijau segar
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: width * 0.7, // Lebar tombol 70% dari lebar layar
  },
  buttonTitle: {
    fontSize: width * 0.05, // Ukuran font dinamis untuk judul tombol
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default HomeScreen;
