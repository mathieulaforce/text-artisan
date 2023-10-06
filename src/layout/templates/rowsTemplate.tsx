import { ParentComponent } from 'solid-js';
import DataSection from '../../components/features/data/dataSection';
import OutputSection from '../../components/features/output/outputSection';
import PatternSection from '../../components/features/pattern/patternSection';

const RowsTemplate: ParentComponent = () => {
  return (
    <div class="grid grid-cols-1 h-full [&>*:nth-child(odd)]:bg-base-300 [&>*:nth-child(even)]:bg-base-200">
      <div class="grid overflow-auto p-4 gap-2">
        <DataSection />
      </div>
      <div class="grid  overflow-auto p-4 gap-2">
        <PatternSection />
      </div>
      <div class="grid  overflow-auto p-4 gap-2">
        <OutputSection />
      </div>
    </div>
  );
};

export default RowsTemplate;
