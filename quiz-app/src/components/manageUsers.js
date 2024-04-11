import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    gender: '', // Default to 'Male' (m)
    email: '',
    password: '',
    role: '', // Default to 'USER'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://quiz-app-react-native.vercel.app/admin/get-users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const userData = await response.json();
      setUsers(userData.users);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    // Reset newUser when closing the modal
    if (!isModalVisible) {
      setNewUser({
        first_name: '',
        last_name: '',
        gender: '',
        email: '',
        password: '',
        role: '',
      });
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch('https://quiz-app-react-native.vercel.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      toggleModal();
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleChange = (value, key) => {
    setNewUser(prevUser => ({ ...prevUser, [key]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title,{marginBottom:20}]}>Total Users: {users.length}</Text>
      <View style={styles.header}>
        <Text style={styles.title}>User List</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Icon name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {users.map(user => (
        <View key={user.id} style={styles.userItem}>
          <Text style={styles.userName}>{user.first_name} {user.last_name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userRole}>{user.role}</Text>
        </View>
      ))}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New User</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={newUser.first_name}
              onChangeText={text => handleChange(text, 'first_name')}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={newUser.last_name}
              onChangeText={text => handleChange(text, 'last_name')}
            />
            <Picker
              selectedValue={newUser.gender}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => handleChange(itemValue, 'gender')}
            >
              <Picker.Item label="Male" value="m" />
              <Picker.Item label="Female" value="f" />
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={newUser.email}
              onChangeText={text => handleChange(text, 'email')}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={newUser.password}
              onChangeText={text => handleChange(text, 'password')}
            />
            <Picker
              selectedValue={newUser.role}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => handleChange(itemValue, 'role')}
            >
              <Picker.Item label="Admin" value="ADMIN" />
              <Picker.Item label="User" value="USER" />
            </Picker>
            <View style={styles.buttonContainer}>
              <Button title="Add User" onPress={handleAddUser} />
              <Button title="Cancel" onPress={toggleModal} />
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
    padding: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingRight:10,
  },
  userItem: {
    marginBottom: 10,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    width:'40%'
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
    width:'45%'
  },
  userRole: {
    fontSize: 14,
    color: '#555',
    width:'20%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding:30
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  }
});

export default ManageUsers;
