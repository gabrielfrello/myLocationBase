import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveDarkMode = async (isDarkMode) => {
  try {
    await AsyncStorage.setItem('@darkMode', JSON.stringify(isDarkMode));
  } catch (error) {
    console.log("Erro ao salvar o tema:", error);
  }
};

export const loadDarkMode = async () => {
  try {
    const value = await AsyncStorage.getItem('@darkMode');
    return value !== null ? JSON.parse(value) : false;
  } catch (error) {
    console.log("Erro ao carregar tema:", error);
    return false;
  }
};