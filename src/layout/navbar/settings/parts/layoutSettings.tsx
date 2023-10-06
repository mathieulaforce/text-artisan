import { Component } from 'solid-js';
import { useLayout } from '../../../../providers/displaySettingsProvider';
import type LayoutType from '../../../../types/LayoutType';

const isSelectedLayoutClass = (layout: string, value: LayoutType) => {
  return layout === value ? 'invert' : '';
};

const LayoutSettings: Component = () => {
  const [layout, setLayout] = useLayout();

  const layoutEntryClass = 'flex gap-2 p-2 cursor-pointer bg-base-content hover:invert';

  return (
    <div class="flex flex-col gap-2">
      <label tabindex="0" class="">
        Layout
      </label>
      <div class="grid grid-cols-2 gap-2">
        <div class={`${layoutEntryClass} ${isSelectedLayoutClass(layout(), 'rows')}`} onclick={() => setLayout('rows')}>
          <span class="h-8 w-8 relative border border-base-100 hover:border-base-300 before:bg-base-100 before:h-px before:left-0 before:right-0 before:absolute before:top-1/3 after:bg-base-100 after:h-px after:left-0 after:right-0 after:absolute after:bottom-1/3"></span>
          <span>Rows</span>
        </div>
        <div class={`${layoutEntryClass}  ${isSelectedLayoutClass(layout(), 'result bottom')}`} onclick={() => setLayout('result bottom')}>
          <span class="h-8 w-8 relative border border-base-100 hover:border-base-300 before:bg-base-100 before:w-px before:left-1/2 before:absolute before:top-0 before:bottom-1/2 after:bg-base-100 after:h-px after:left-0 after:right-0 after:absolute after:bottom-1/2"></span>
          <span>Result bottom</span>
        </div>
        <div class={`${layoutEntryClass}  ${isSelectedLayoutClass(layout(), 'result left')}`} onclick={() => setLayout('result left')}>
          <span class="h-8 w-8 relative border border-base-100 hover:border-base-300 before:bg-base-100 before:h-px before:left-1/2 before:right-0 before:absolute before:top-1/2 after:bg-base-100 after:w-px after:left-1/2 after:absolute after:top-0 after:bottom-0"></span>
          <span>Result left</span>
        </div>
        <div class={`${layoutEntryClass} ${isSelectedLayoutClass(layout(), 'result right')}`} onclick={() => setLayout('result right')}>
          <span class="h-8 w-8 relative border border-base-100 hover:border-base-300 before:bg-base-100 before:h-px before:left-0 before:right-1/2 before:absolute before:top-1/2 after:bg-base-100 after:w-px after:left-1/2 after:absolute after:top-0 after:bottom-0"></span>
          <span>Result right</span>
        </div>
      </div>
    </div>
  );
};

export default LayoutSettings;
