import { createRoot } from 'react-dom/client';
import '../src/index.css';
import { Provider as ReduxProvider } from 'react-redux';
import Main from '../src/components/Main/index';
import { BrowserRouter } from "react-router";
import { appStore } from '../src/store/appStore.ts';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <BrowserRouter>
    <ReduxProvider store={appStore}>
      <Main />
    </ReduxProvider>
  </BrowserRouter>
);
