import TextArtisanProvider from './providers/textArtisanProvider';
import TextArtisanPage from './pages/TextArtisanPage';
import DisplaySettingsProvider from './providers/displaySettingsProvider';

function App() {
  return (
    <TextArtisanProvider>
      <DisplaySettingsProvider>
        <TextArtisanPage />
      </DisplaySettingsProvider>
    </TextArtisanProvider>
  );
}

export default App;
