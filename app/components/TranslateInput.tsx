import { View, TextInput, Image } from 'react-native';
import React from 'react';
import { icons } from '../constants/icons';

interface TranslateInputProps {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
  icon?: any;
}

const TranslateInput = ({
  value,
  onChangeText,
  placeholder = 'Translate here',
  editable = true,
  icon = icons.search,
}: TranslateInputProps) => {

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        borderWidth: 2,
        borderColor: '#A3B18A', // sua cor de borda primaria
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: editable ? 5 : 4,
        width: '93%',
        minHeight: 0,
        backgroundColor: editable ? 'white' : '#f0f0f0',
      }}
    >
      <Image
        source={icon}
        style={{ width: 20, height: 20, tintColor: '#99C99E', marginRight: 10 }}
        resizeMode="contain"
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        multiline={true}
        scrollEnabled={editable}
        placeholderTextColor="#99C99E"
        style={{
          flex: 1,
          color: editable ? 'black' : '#555', // texto mais claro se não editável
          fontSize: 16,
          paddingVertical: 1,
          alignItems: 'center',
          justifyContent:'center',
          textAlign:"center",
          marginTop: 0, // remover margem superior
        }}
      />
    </View>
  );
};

export default TranslateInput;
