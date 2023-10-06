import { Component } from 'solid-js';

interface ClearButtonProps {
  onclick: () => void;
}

const CopyButton: Component<ClearButtonProps> = (props) => {
  return (
    <button class="btn btn-primary btn-xs" onclick={props.onclick}>
      Copy
    </button>
  );
};

export default CopyButton;
