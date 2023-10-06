import { Component } from 'solid-js';
import TextArea from '../../ui/textArea';
import { useInputSettings, useTemplateInputData } from '../../../providers/textArtisanProvider';
import InputDataSettings from './header/inputDataSettings';

const DataSection: Component = () => {
  const [input, setInput] = useTemplateInputData();
  const [settings, setSettings] = useInputSettings();
  return (
    <div class="grid grid-rows-[auto_1fr] gap-2">
      <InputDataSettings settings={settings()} setSettings={setSettings} clearText={() => setInput('')} />
      <TextArea value={input()} onInput={(e) => setInput(e.currentTarget.value)} />
    </div>
  );
};

export default DataSection;
