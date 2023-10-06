import { ParentComponent, createContext, createEffect, createRenderEffect } from 'solid-js';
import { SetStoreFunction, createStore, produce } from 'solid-js/store';
import theme from '../assets/themes.json';
import { localStorageItemAccessor } from '../utils/localStorageAccessor';
import useContextOrThrow from '../hooks/useContextOrThrow';
import type LayoutType from '../types/LayoutType';

const initialDisplaySettings = {
  layout: 'rows' as LayoutType,
  theme: theme[0],
};

type DisplaySettingsType = typeof initialDisplaySettings;

const DisplaySettingsContext = createContext<[DisplaySettingsType, SetStoreFunction<DisplaySettingsType>]>();

const DisplaySettingsProvider: ParentComponent = (props) => {
  const displaySettingStorage = localStorageItemAccessor<DisplaySettingsType>('display-settings', initialDisplaySettings);
  const [displaySetting, setDisplaySettings] = createStore<DisplaySettingsType>(displaySettingStorage.getItem());

  createRenderEffect(() => {
    const html = document.querySelector('html');
    html?.setAttribute('data-theme', displaySetting.theme);
  });

  createEffect(() => {
    displaySettingStorage.saveItem(displaySetting);
  });

  return <DisplaySettingsContext.Provider value={[displaySetting, setDisplaySettings]}>{props.children}</DisplaySettingsContext.Provider>;
};

export const useLayout = (): [() => LayoutType, (value: LayoutType) => void] => {
  const [displaySetting, setDisplaySettings] = useContextOrThrow(DisplaySettingsContext);
  return [() => displaySetting.layout, (layout) => setDisplaySettings(produce((state) => (state.layout = layout)))];
};

export const useTheme = (): [() => string, (value: string) => void] => {
  const [displaySetting, setDisplaySettings] = useContextOrThrow(DisplaySettingsContext);
  return [() => displaySetting.theme, (theme) => setDisplaySettings(produce((state) => (state.theme = theme)))];
};

export default DisplaySettingsProvider;
