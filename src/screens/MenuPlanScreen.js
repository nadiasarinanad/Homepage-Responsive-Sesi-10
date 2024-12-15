import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, Button, Alert } from 'react-native';
import { getWeeklyMenu, createMenuItem, updateMenuItem, deleteMenuItem } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const MenuPlanScreen = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemTime, setNewItemTime] = useState('');
  const [newItemDay, setNewItemDay] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); // Untuk item yang diedit
  const navigation = useNavigation();

  useEffect(() => {
    fetchMenu();
  }, []);

  // Mengambil menu dari API
  const fetchMenu = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getWeeklyMenu();
      setMenu(response.data || []); // Pastikan response berupa array
    } catch (err) {
      console.error('Gagal memuat menu:', err);
      setError('Gagal memuat menu. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // Menambah item baru
  const handleAddItem = async () => {
    if (!newItemName || !newItemTime || !newItemDay) {
      Alert.alert('Error', 'Harap isi semua bidang.');
      return;
    }
    const newItem = { name: newItemName, time: newItemTime, day: newItemDay };
    try {
      await createMenuItem(newItem);

      // Tambahkan item ke state lokal
      setMenu(prevMenu => [
        ...prevMenu,
        { ...newItem, id: Math.random().toString() } // ID sementara
      ]);
      setNewItemName('');
      setNewItemTime('');
      setNewItemDay('');
    } catch (err) {
      console.error('Gagal menambahkan item:', err);
      Alert.alert('Error', 'Tidak dapat menambahkan item.');
    }
  };

  // Pilih item untuk diedit
  const handleUpdate = (item) => {
    setSelectedItem(item);
    setNewItemName(item.name);
    setNewItemTime(item.time);
    setNewItemDay(item.day);
  };

  // Simpan perubahan setelah edit
  const handleSaveUpdate = async () => {
    if (!selectedItem || !newItemName || !newItemTime || !newItemDay) return;

    const updatedItem = { name: newItemName, time: newItemTime, day: newItemDay };
    try {
      await updateMenuItem(selectedItem.id, updatedItem);

      setMenu(prevMenu => prevMenu.map(item =>
        item.id === selectedItem.id ? { ...item, ...updatedItem } : item
      ));
      setSelectedItem(null);
      setNewItemName('');
      setNewItemTime('');
      setNewItemDay('');
    } catch (err) {
      console.error('Gagal memperbarui item:', err);
      Alert.alert('Error', 'Tidak dapat memperbarui item.');
    }
  };

  // Menghapus item
  const handleDelete = async (id) => {
    try {
      await deleteMenuItem(id);
      setMenu(prevMenu => prevMenu.filter(item => item.id !== id));
    } catch (err) {
      console.error('Gagal menghapus item:', err);
      Alert.alert('Error', 'Tidak dapat menghapus item.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rencana Menu Harian</Text>

      {/* Form input untuk menambah atau edit item */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nama Makanan"
          value={newItemName}
          onChangeText={setNewItemName}
        />
        <TextInput
          style={styles.input}
          placeholder="Waktu Makan (contoh: Pagi)"
          value={newItemTime}
          onChangeText={setNewItemTime}
        />
        <TextInput
          style={styles.input}
          placeholder="Hari (contoh: Senin)"
          value={newItemDay}
          onChangeText={setNewItemDay}
        />
        {selectedItem ? (
          <Button title="Simpan Perubahan" onPress={handleSaveUpdate} color="#FFA500" />
        ) : (
          <Button title="Tambah Item" onPress={handleAddItem} color="#008000" />
        )}
      </View>

      {/* Daftar menu */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000FF" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={menu}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Text style={styles.dayTitle}>{item.day}</Text>
              <Text style={styles.mealText}>Nama: {item.name}</Text>
              <Text style={styles.mealText}>Waktu: {item.time}</Text>
              <View style={styles.buttonRow}>
                <Button title="Edit" onPress={() => handleUpdate(item)} color="#FFA500" />
                <Button title="Hapus" onPress={() => handleDelete(item.id)} color="#FF0000" />
                <Button
                  title="Info Nutrisi"
                  onPress={() => navigation.navigate('Nutrition', { itemId: item.id })}
                  color="#1E90FF"
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  menuItem: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 8,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 4,
  },
  mealText: {
    fontSize: 14,
    color: '#555',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default MenuPlanScreen;
