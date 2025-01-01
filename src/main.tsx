import { createRoot } from 'react-dom/client';

import './styles';

import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './utils/redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
