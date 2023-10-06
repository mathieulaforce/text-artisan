import { Component } from 'solid-js';
import DesignButton from './settings/designButton';

const Navbar: Component = () => {
  return (
    <div class="flex bg-neutral text-neutral-content py-2 px-4">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case btn-sm text-sm">Text Artisan</a>
      </div>
      <div class="flex gap-2">
        <DesignButton />
      </div>
    </div>
  );
};

export default Navbar;
