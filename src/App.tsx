import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import Main from './components/Main';
import { BrowserRouter } from 'react-router';
import { appStore } from './store/appStore.ts';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <BrowserRouter>
    <ReduxProvider store={appStore}>
      <Main />
    </ReduxProvider>
  </BrowserRouter>
);
