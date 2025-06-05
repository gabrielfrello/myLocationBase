import * as Location from 'expo-location';
import openDB from '../database/db';

export const requestPermission = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Permissão para acessar localização negada.');
    return false;
  }
  return true;
};

export const getDeviceLocation = async () => {
  const permission = await requestPermission();
  if (!permission) return null;

  const location = await Location.getCurrentPositionAsync({});
  return location.coords;
};

export const saveLocation = async (latitude, longitude) => {
  const db = openDB();
  const timestamp = new Date().toISOString();
  db.runSync(
    'INSERT INTO locations (latitude, longitude, timestamp) VALUES (?, ?, ?)',
    [latitude, longitude, timestamp]
  );
};

export const loadLocationsFromDB = async () => {
  const db = openDB();
  return db.getAllSync('SELECT * FROM locations ORDER BY id DESC');
};