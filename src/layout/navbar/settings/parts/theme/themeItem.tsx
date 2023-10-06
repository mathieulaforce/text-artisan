import { Component } from 'solid-js';

interface ThemeItemProps {
  theme: string;
  isSelected: boolean;
  onThemeSelected: (theme: string) => void;
}

const ThemeItem: Component<ThemeItemProps> = (props) => {
  return (
    <div class="grid grid-cols-5 grid-rows-3" onclick={() => props.onThemeSelected(props.theme)}>
      <div class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
        <input type="checkbox" checked={props.isSelected} class="checkbox" />
        <div class="flex-grow text-sm">{props.theme}</div>
        <div class="flex h-full flex-shrink-0 flex-wrap gap-1">
          <div class="bg-primary w-2 rounded"></div>
          <div class="bg-secondary w-2 rounded"></div>
          <div class="bg-accent w-2 rounded"></div>
          <div class="bg-neutral w-2 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ThemeItem;
