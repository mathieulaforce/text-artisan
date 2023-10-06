import { Component, For } from 'solid-js';
import themes from '../../../../../assets/themes.json';
import ThemeItem from './themeItem';
import { useTheme } from '../../../../../providers/displaySettingsProvider';

const ThemeSettings: Component = () => {
  const [currentTheme, setCurrentTheme] = useTheme();

  return (
    <div class="flex flex-col gap-2">
      <label tabindex="0" class="">
        Theme
      </label>
      <div class="grid grid-cols-2">
        <For each={themes.sort()}>
          {(theme) => (
            <div
              data-theme={theme}
              class="bg-base-100 flex-1 text-base-content w-44 cursor-pointer"
            >
              <ThemeItem
                theme={theme}
                isSelected={theme === currentTheme()}
                onThemeSelected={setCurrentTheme}
              />
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default ThemeSettings;
