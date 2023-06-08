import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

export default function Tarefa({ data, deleteItem }) {
  return (
    <TouchableOpacity style={styles.container} onPress={deleteItem}>
      <FontAwesome name="check-square" size={20} color="#62F353" />
      <Text style={styles.taskName}>{data.nome}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  taskName: {
    fontSize: 16,
    marginLeft: 12,
    color: '#222222'
  }
});
