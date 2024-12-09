import { Provider } from 'react-redux';

import { Router } from './components/modules/Router/Router';
import { store } from './utils/redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
