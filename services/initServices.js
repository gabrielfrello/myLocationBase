import { saveDarkMode, loadDarkMode } from './themeService';
import { getDeviceLocation, saveLocation, loadLocationsFromDB } from './locationService';

export const initializeServices = ({ setIsSwitchOn, setLocations }) => {

  global.loadDarkMode = async () => {
    const darkMode = await loadDarkMode();
    setIsSwitchOn(darkMode);
  };

  global.onToggleSwitch = async (isSwitchOn) => {
    await saveDarkMode(isSwitchOn);
  };

  global.getLocation = async (setIsLoading, loadLocations) => {
    setIsLoading(true);
    const coords = await getDeviceLocation();

    if (coords) {
      await saveLocation(coords.latitude, coords.longitude);
      await loadLocations();
    }

    setIsLoading(false);
  };

  global.loadLocations = async (setIsLoading) => {
    setIsLoading(true);
    const locationsFromDB = await loadLocationsFromDB();
    setLocations(locationsFromDB);
    setIsLoading(false);
  };
};