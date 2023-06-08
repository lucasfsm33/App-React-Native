import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import axios from 'axios';

import { FontAwesome } from '@expo/vector-icons';

import Task from './src/Tarefa';

import { api } from './services/api';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  function handleAdd() {
    if (tarefa === '') {
      return;
    }

    const dados = {
      nome: tarefa
    };

    api.post('/tarefa/criar', dados)
      .then(response => {
        fetchData();
      })
      .catch(error => {
        console.error(error);
      });

    setTarefa('');
  }

  function fetchData() {
    api.get('/tarefas')
      .then(response => {
        setList(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  async function handleDeleteTask(id) {
    try {
      await api.delete('/tarefa/remover', {
        params: {
          id: id,
        },
      });
  
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sua lista de tarefas</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Insira a tarefa que deseja adicionar"
          value={tarefa}
          onChangeText={(text) => setTarefa(text)}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <FontAwesome name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Task data={item} deleteItem={() => handleDeleteTask(item.item)} />}
        style={styles.taskList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 35
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 12,
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  input: {
    flex: 1,
    height: 44,
    color: '#222222',
    paddingHorizontal: 20
  },
  button: {
    width: 55,
    height: 44,
    backgroundColor: '#62F353',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  taskList: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  }
});
