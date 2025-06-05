import { saveDarkMode, loadDarkMode } from './themeService';
import { getDeviceLocation, saveLocation, loadLocationsFromDB } from './locationService';

export const initializeServices = ({ setIsSwitchOn, setLocations }) => {

  global.loadDarkMode = async () => {
    const darkMode = await loadDarkMode();
    setIsSwitchOn(darkMode);
  };

  global.onToggleSwitch = async (currentValue) => {
    const newValue = !currentValue;
    await saveDarkMode(newValue);
    setIsSwitchOn(newValue);
  };

  global.getLocation = async () => {
    const coords = await getDeviceLocation();

    if (coords) {
      await saveLocation(coords.latitude, coords.longitude);
      await global.loadLocations();
    }
  };

  global.loadLocations = async () => {
    const locationsFromDB = await loadLocationsFromDB();
    setLocations(locationsFromDB);
  };
};