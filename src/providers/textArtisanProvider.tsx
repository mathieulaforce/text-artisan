import { Accessor, ParentComponent, createContext, createRenderEffect } from 'solid-js';
import { SetStoreFunction, createStore, produce } from 'solid-js/store';
import useContextOrThrow from '../hooks/useContextOrThrow';
import type ReactivityProperty from '../types/ReactivityProperty';
import CsvInputReader from '../domain/inputData/inputReader';
import { Configuration, InputConfiguration, PatternConfiguration } from '../types/Configuration';
import { OutputCalculator } from '../domain/output/outputCalculator';
import { PatternMatcher } from '../domain/pattern/patternMatcher';

const initialData: Configuration = {
  settings: {
    input: {
      format: 'CSV',
      containsHeader: true,
      columnSeparator: ',',
      rowSeparator: '\n',
    },
    pattern: {
      prefix: '$',
      suffix: '$',
    },
  },
  template: {
    data: {
      input: 'firstname, lastname, country\nJuanita, Fletcher, Spain\nAbigail, Bell, Belarus',
      pattern: 'Id: $rowNumber$\n$h0$: $0$\n$h1$: $lastname$\n$h2$: $country$\n---',
    },
    output: '',
  },
};

const TemplateDataContext = createContext<[typeof initialData, SetStoreFunction<typeof initialData>]>();

const TextArtisanProvider: ParentComponent = (props) => {
  const store = createStore(initialData);
  const [configuration, setConfiguration] = store;

  const outputCalculator = new OutputCalculator(new PatternMatcher(), new CsvInputReader());

  createRenderEffect(() => {
    const options = {
      columnSeparator: configuration.settings.input.columnSeparator,
      rowSeparator: configuration.settings.input.rowSeparator,
      containsHeaderRow: configuration.settings.input.containsHeader,
    };
    outputCalculator.setInputInformation(configuration.template.data.input, options);
    setConfiguration(produce((s) => (s.template.output = outputCalculator.generate())));
  });

  createRenderEffect(() => {
    outputCalculator.setPatternInformation(configuration.template.data.pattern, configuration.settings.pattern);
    setConfiguration(produce((s) => (s.template.output = outputCalculator.generate())));
  });

  return <TemplateDataContext.Provider value={store}>{props.children}</TemplateDataContext.Provider>;
};

export const useInputSettings = (): ReactivityProperty<InputConfiguration> => {
  const [configuration, setConfiguration] = useContextOrThrow(TemplateDataContext);
  return [
    () => configuration.settings.input,
    (config: InputConfiguration) => {
      setConfiguration(produce((state) => (state.settings.input = { ...config })));
    },
  ];
};

export const usePatternSettings = (): ReactivityProperty<PatternConfiguration> => {
  const [configuration, setConfiguration] = useContextOrThrow(TemplateDataContext);
  return [
    () => configuration.settings.pattern,
    (config: PatternConfiguration) => {
      setConfiguration(produce((state) => (state.settings.pattern = { ...config })));
    },
  ];
};

export const useTemplateInputData = (): ReactivityProperty<string> => {
  const [configuration, setConfiguration] = useContextOrThrow(TemplateDataContext);
  return [() => configuration.template.data.input, (input: string) => setConfiguration(produce((state) => (state.template.data.input = input)))];
};

export const useTemplatePatternData = (): ReactivityProperty<string> => {
  const [configuration, setConfiguration] = useContextOrThrow(TemplateDataContext);
  return [() => configuration.template.data.pattern, (pattern: string) => setConfiguration(produce((state) => (state.template.data.pattern = pattern)))];
};

export const useTemplateOutput = (): Accessor<string> => {
  const [configuration] = useContextOrThrow(TemplateDataContext);
  return () => configuration.template.output;
};

export default TextArtisanProvider;
