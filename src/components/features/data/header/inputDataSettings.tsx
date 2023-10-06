import { Component } from 'solid-js';
import ClearButton from '../../../ui/buttons/clearButton';
import { InputConfiguration } from '../../../../types/Configuration';

interface InputDataSettingsProps {
  settings: InputConfiguration;
  setSettings: (settings: InputConfiguration) => void;
  clearText: () => void;
}

const escapeEscapableChars = (value: string) => {
  return value.replace(/\n/g, '\\n');
};

const unEscapeEscapableChars = (value: string) => {
  return value.replace(/\\n/g, '\n');
};

const InputDataSettings: Component<InputDataSettingsProps> = (props) => {
  return (
    <div class="flex justify-between gap-2">
      <span>Data</span>
      <div class="flex gap-2">
        <label class="flex gap-2  place-items-center">
          <span class="label-text">Format</span>
          <div class="join">
            <input class="join-item btn btn-xs" checked={'CSV' === props.settings.format} type="radio" name="inputFormat" aria-label="CSV" />
            <input class="join-item btn btn-xs" checked={'JSON' === props.settings.format} disabled type="radio" name="inputFormat" aria-label="JSON" />
          </div>
        </label>
        <label class="flex gap-2 place-items-center">
          <span class="label-text ">Header</span>
          <input
            type="checkbox"
            checked={props.settings.containsHeader}
            onclick={() => {
              props.setSettings({ ...props.settings, containsHeader: !props.settings.containsHeader });
            }}
            class="checkbox checkbox-primary checkbox-xs"
          />
        </label>
        <label class="flex gap-1 place-items-center">
          <span class="label-text ">Column separator</span>
          <input
            type="text"
            placeholder="column separator"
            value={escapeEscapableChars(props.settings.columnSeparator)}
            class="input input-bordered input-xs w-14"
            oninput={(e) => props.setSettings({ ...props.settings, columnSeparator: unEscapeEscapableChars(e.target.value) })}
          />
        </label>
        <label class="flex gap-2 place-items-center">
          <span class="label-text ">Row separator</span>
          <input
            type="text"
            placeholder="row separator"
            value={escapeEscapableChars(props.settings.rowSeparator)}
            class="input input-bordered input-xs w-14"
            oninput={(e) => {
              props.setSettings({ ...props.settings, rowSeparator: unEscapeEscapableChars(e.target.value) });
            }}
          />
        </label>
      </div>

      <ClearButton onclick={props.clearText} />
    </div>
  );
};

export default InputDataSettings;
