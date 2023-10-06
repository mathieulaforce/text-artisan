import { Component } from 'solid-js';
import TextArea from '../../ui/textArea';
import { useTemplateOutput } from '../../../providers/textArtisanProvider';
import CopyButton from '../../ui/buttons/copyButton';

const OutputSection: Component = () => {
  const output = useTemplateOutput();
  let textAreaRef: HTMLTextAreaElement | undefined;

  const onCopyClicked = () => {
    if (textAreaRef) {
      // the user is allowed to type in the output file.
      // when changed, copy the text area value and not the generated output file
      navigator.clipboard.writeText(textAreaRef.value);
    }
  };

  return (
    <div class="grid grid-rows-[auto_1fr] gap-2">
      <div class="flex justify-between gap-2">
        <span class="flex-1 text-right">Output</span>
        <CopyButton onclick={onCopyClicked} />
      </div>
      <TextArea ref={textAreaRef} value={output()} />
    </div>
  );
};

export default OutputSection;
