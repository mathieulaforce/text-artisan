export type InputConfiguration = {
  format: 'CSV' | 'JSON';
  containsHeader: boolean;
  columnSeparator: string;
  rowSeparator: string;
};

export type PatternConfiguration = {
  prefix: string;
  suffix: string;
};

export type Configuration = {
  settings: {
    input: InputConfiguration;
    pattern: PatternConfiguration;
  };
  template: {
    data: {
      input: string;
      pattern: string;
    };
    output: string;
  };
};
