import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Logo from "../assets/images/Logo.png"; // seu logo
import { icons } from "../constants/icons"; // seus ícones
import TranslateInput from "../components/TranslateInput";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native";

const MICROSOFT_TRANSLATOR_ENDPOINT = "https://api.cognitive.microsofttranslator.com";
const MICROSOFT_TRANSLATOR_KEY = "CT10kJTAtkFj46u3vLOvRIv3bqGAGpzOUMusrSH5gfG3rkoGiexrJQQJ99BFACZoyfiXJ3w3AAAbACOGX73e";
const MICROSOFT_TRANSLATOR_REGION = "brazilsouth";
import AsyncStorage from '@react-native-async-storage/async-storage';



// Salvar uma tradução
const saveTranslation = async (original: string, translated: string) => {
  const history = await AsyncStorage.getItem('@translation_history');
  const newHistory = history ? JSON.parse(history) : [];
  
  // Limitar o histórico aos últimos 50 itens
  const updatedHistory = [...newHistory, { original, translated, date: new Date().toISOString() }].slice(-50);
  
  await AsyncStorage.setItem('@translation_history', JSON.stringify(updatedHistory));
};

// Recuperar histórico
const loadHistory = async () => {
  const history = await AsyncStorage.getItem('@translation_history');
  return history ? JSON.parse(history) : [];
};

// Função para chamar a API do Microsoft Translator
const callTranslationApi = async (
  textToTranslate: string,
  targetLanguage: string
) => {
  if (
    !MICROSOFT_TRANSLATOR_KEY
  ) {
    Alert.alert(
      "Configuração de API Necessária",
      "Por favor, configure corretamente o arquivo .env com sua chave, endpoint e região do Microsoft Translator."
    );
    return null;
  }

  const API_URL = `${MICROSOFT_TRANSLATOR_ENDPOINT}/translate?api-version=3.0&to=${targetLanguage}`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": MICROSOFT_TRANSLATOR_KEY,
        "Ocp-Apim-Subscription-Region": MICROSOFT_TRANSLATOR_REGION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ Text: textToTranslate }]),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro da API de Tradução Microsoft:", errorData);
      const errorMessage =
        errorData.error?.message || "Erro desconhecido na tradução Microsoft.";
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data[0].translations[0].text;
  } catch (error: any) {
    console.error("Erro ao traduzir com Microsoft Translator:", error.message);
    Alert.alert(
      "Erro de Tradução",
      `Não foi possível traduzir: ${error.message}`
    );
    return null;
  }
};

export default function TranslationScreen() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("pt");
  const navigation = useNavigation();

  const languages = [
    { label: "Português (Brasil)", value: "pt" },
    { label: "Inglês", value: "en" },
    { label: "Espanhol", value: "es" },
    { label: "Francês", value: "fr" },
    { label: "Alemão", value: "de" },
    { label: "Japonês", value: "ja" },
    { label: "Chinês (Simplificado)", value: "zh-Hans" },
    { label: "Italiano", value: "it" },
    { label: "Russo", value: "ru" },
  ];

  const performTranslation = async (text: string, lang: string) => {
    if (!text.trim()) {
      setTranslatedText(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setTranslatedText("Traduzindo...");

    const result = await callTranslationApi(text, lang);
    if (result) {
      setTranslatedText(result);
      await saveTranslation(text, result);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      performTranslation(inputText, targetLanguage);
    }, 700);

    return () => clearTimeout(handler);
  }, [inputText, targetLanguage]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoContainer}>
          
          <Image style={styles.logo} source={Logo} />
          <TouchableOpacity 
            onPress={() => navigation.navigate('History' as never)}
            style={styles.saveButton}
          >
            <Image source={icons.save} style={styles.saveIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.mainContentContainer}>
          <TranslateInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite o texto aqui..."
            editable={true}
            icon={icons.search}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Traduzir para:</Text>
            <Picker
              selectedValue={targetLanguage}
              onValueChange={(itemValue) => setTargetLanguage(itemValue)}
              style={styles.picker}
            >
              {languages.map((lang) => (
                <Picker.Item
                  key={lang.value}
                  label={lang.label}
                  value={lang.value}
                />
              ))}
            </Picker>
          </View>

          <Image source={icons.arrow} style={styles.arrowIcon} />

          <TranslateInput
            value={
              translatedText ||
              (loading ? "Traduzindo..." : "Aguardando digitação...")
            }
            placeholder="Aqui está sua tradução"
            editable={false}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    paddingTop: 0,
    backgroundColor:'white'
  },
  logoContainer: {
    width: "100%",
    alignItems: "flex-start",
    paddingLeft: 20,
    marginTop: 20,
    flex: 0.2,
    justifyContent: "center",
  },
  logo: {
    resizeMode: "center",
    width: 250,
    marginLeft: 4,
    top: 93,
  },
  mainContentContainer: {
    flex: 0.8,
    top:90,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  pickerContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
  },
  pickerLabel: {
    fontSize: 16,
    color: "#333",
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    color: "#333",
  },
  arrowIcon: {
    width: 30,
    height: 30,
    transform: [{ rotate: "90deg" }],
    marginVertical: 4,
    tintColor: "#666",
  },
  saveButton: {
    position: 'absolute',
    right: 20,
    top: 100,
  },
  saveIcon: {
    width: 24,
    height: 24,
    tintColor: '#333',
  },
});
