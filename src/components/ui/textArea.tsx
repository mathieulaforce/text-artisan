import { Component, JSX, splitProps } from 'solid-js';
interface TextAreaProps {
  label?: string;
  rows?: number;
  placeholder?: string;
  value: string;
  onInput?: JSX.EventHandler<HTMLTextAreaElement, InputEvent>;
  onChange?: JSX.EventHandler<HTMLTextAreaElement, Event>;
  onBlur?: JSX.EventHandler<HTMLTextAreaElement, FocusEvent>;
  ref?: HTMLTextAreaElement | ((el: HTMLTextAreaElement) => void) | undefined;
}

const TextArea: Component<TextAreaProps> = (props) => {
  const [inputProps, eventHanlers] = splitProps(props, [
    'label',
    'value',
    'placeholder',
    'rows',
  ]);
  return (
    <div class="form-control grow resize-y">
      {inputProps.label && (
        <label class="label">
          <span class="label-text">{inputProps.label}</span>
        </label>
      )}
      <textarea
        class="textarea textarea-bordered w-full grow resize-none"
        ref={props.ref}
        rows={inputProps.rows}
        onInput={eventHanlers.onInput}
        onChange={eventHanlers.onChange}
        onBlur={eventHanlers.onBlur}
        value={inputProps.value || ''}
        placeholder={inputProps.placeholder}
      ></textarea>
    </div>
  );
};

export default TextArea;
