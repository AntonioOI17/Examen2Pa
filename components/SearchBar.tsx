import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Keyboard,
  Switch,
  Text,
  Platform,
} from 'react-native';

interface SearchBarProps {
  onSearch: (query: string, exact: boolean) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder }: SearchBarProps) {
  const [text, setText] = useState('');
  const [exact, setExact] = useState(false);

  const handleSearch = () => {
    Keyboard.dismiss();
    onSearch(text, exact);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder || 'Buscar...'}
          value={text}
          onChangeText={setText}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholderTextColor="#999"
        />
        <Button title="Buscar" onPress={handleSearch} color="#6200ee" />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Búsqueda exacta</Text>
        <Switch
          trackColor={{ false: '#ccc', true: '#6200ee' }}
          thumbColor={exact ? '#fff' : '#fff'}
          ios_backgroundColor="#ccc"
          value={exact}
          onValueChange={setExact}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: Platform.OS === 'android' ? 3 : 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  switchLabel: {
    fontSize: 14,
    color: '#444',
    marginRight: 10,
  },
});
