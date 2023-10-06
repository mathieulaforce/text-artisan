import { Component } from 'solid-js';
import ClearButton from '../../../ui/buttons/clearButton';
import { PatternConfiguration } from '../../../../types/Configuration';

interface PatternSettingsProps {
  clearText: () => void;
  settings: PatternConfiguration;
  setSettings: (settings: PatternConfiguration) => void;
}

const PatternSettings: Component<PatternSettingsProps> = (props) => {
  return (
    <div class="flex justify-between gap-2">
      <span>Pattern</span>
      <div class="flex gap-2">
        <label class="flex gap-2 place-items-center">
          <span class="label-text ">Prefix</span>
          <input type="text" placeholder="Prefix" value={props.settings.prefix} oninput={(e) => props.setSettings({ ...props.settings, prefix: e.target.value })} class="input input-bordered input-xs w-16" />
          <span class="label-text ">Suffix</span>
          <input type="text" placeholder="Suffix" value={props.settings.suffix} oninput={(e) => props.setSettings({ ...props.settings, suffix: e.target.value })} class="input input-bordered input-xs w-16" />
        </label>
      </div>
      <ClearButton onclick={props.clearText} />
    </div>
  );
};

export default PatternSettings;
