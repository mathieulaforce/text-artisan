import { Component } from 'solid-js';
import TextArea from '../../ui/textArea';
import { usePatternSettings, useTemplatePatternData } from '../../../providers/textArtisanProvider';
import PatternSettings from './header/patternSettings';

const PatternSection: Component = () => {
  const [pattern, setPattern] = useTemplatePatternData();
  const [settings, setSettings] = usePatternSettings();

  return (
    <div class="grid grid-rows-[auto_1fr] gap-2">
      <PatternSettings clearText={() => setPattern('')} settings={settings()} setSettings={setSettings} />
      <TextArea value={pattern()} onInput={(e) => setPattern(e.currentTarget.value)} />
    </div>
  );
};

export default PatternSection;
