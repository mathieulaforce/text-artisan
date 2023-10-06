import { Component } from 'solid-js';
import { Fa } from 'solid-fa';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import LayoutSettings from './parts/layoutSettings';
import ThemeSettings from './parts/theme/themeSettings';

const DesignButton: Component = () => {
  return (
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-sm">
        <Fa icon={faPalette} /> Design
      </label>
      <div tabindex="0" class="dropdown-content z-[1] card card-compact w-96 p-2 shadow bg-base-content text-base-100">
        <div class="flex flex-col gap-2">
          <LayoutSettings />
          <ThemeSettings />
        </div>
      </div>
    </div>
  );
};

export default DesignButton;
