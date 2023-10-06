import { Component, Match, Switch } from 'solid-js';
import Navbar from '../layout/navbar';
import { useLayout } from '../providers/displaySettingsProvider';
import RowsTemplate from '../layout/templates/rowsTemplate';
import ResultBottomTemplate from '../layout/templates/resultBottom';
import ResultRightTemplate from '../layout/templates/resultRight';
import ResultLeftTemplate from '../layout/templates/resultLeft';
import Footer from '../layout/footer';

const TextArtisanPage: Component = () => {
  const [layout] = useLayout();
  return (
    <div class="flex flex-col h-full">
      <Navbar />
      <div class="flex-1">
        <Switch fallback={<RowsTemplate />}>
          <Match when={layout() === 'result bottom'}>
            <ResultBottomTemplate />
          </Match>
          <Match when={layout() === 'result left'}>
            <ResultLeftTemplate />
          </Match>
          <Match when={layout() === 'result right'}>
            <ResultRightTemplate />
          </Match>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default TextArtisanPage;
