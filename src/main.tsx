import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './styles';

import App from './App.tsx';
import { store } from './utils/redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <>
      <App />
    </>
  </Provider>
);
