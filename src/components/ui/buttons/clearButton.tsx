import { Component } from 'solid-js';

interface ClearButtonProps {
  onclick: () => void;
}

const ClearButton: Component<ClearButtonProps> = (props) => {
  return (
    <button class="btn btn-accent btn-xs" onclick={props.onclick}>
      Clear
    </button>
  );
};

export default ClearButton;
