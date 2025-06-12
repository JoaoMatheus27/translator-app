import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons } from "../constants/icons";
import { useFocusEffect } from '@react-navigation/native';

interface TranslationItem {
  original: string;
  translated: string;
  date: string;
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<TranslationItem[]>([]);

  const loadHistory = async () => {
    const storedHistory = await AsyncStorage.getItem('@translation_history');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory).reverse()); // Mostrar as mais recentes primeiro
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadHistory();
    }, [])
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Histórico de Traduções</Text>
          
          {history.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma tradução salva ainda</Text>
          ) : (
            <FlatList
              data={history}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.originalText}>{item.original}</Text>
                  <Text style={styles.translatedText}>{item.translated}</Text>
                  <Text style={styles.dateText}>
                    {new Date(item.date).toLocaleDateString('pt-BR')} - {new Date(item.date).toLocaleTimeString('pt-BR')}
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  originalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  translatedText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});