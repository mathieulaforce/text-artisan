import { ParentComponent } from 'solid-js';
import DataSection from '../../components/features/data/dataSection';
import OutputSection from '../../components/features/output/outputSection';
import PatternSection from '../../components/features/pattern/patternSection';

const ResultBottomTemplate: ParentComponent = () => {
  return (
    <div class="grid grid-col h-full bg-base-300 overflow-auto">
      <div class="flex [&>*]:flex-1 gap-2 p-4">
        <DataSection />
        <PatternSection />
      </div>
      <div class="grid p-4">
        <OutputSection />
      </div>
    </div>
  );
};

export default ResultBottomTemplate;
