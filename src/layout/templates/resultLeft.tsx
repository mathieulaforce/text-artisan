import { ParentComponent } from 'solid-js';
import DataSection from '../../components/features/data/dataSection';
import OutputSection from '../../components/features/output/outputSection';
import PatternSection from '../../components/features/pattern/patternSection';

const ResultLeftTemplate: ParentComponent = () => {
  return (
    <div class="grid grid-cols-2 h-full [&>*:nth-child(odd)]:bg-base-300 [&>*:nth-child(even)]:bg-base-200">
      <div class="grid h-full p-4 ">
        <OutputSection />
      </div>
      <div class="grid grid-col gap-2 p-4">
        <DataSection />
        <PatternSection />
      </div>
    </div>
  );
};

export default ResultLeftTemplate;
