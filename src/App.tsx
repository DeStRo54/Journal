import { Provider } from 'react-redux';

import { Router } from './components/modules/Router/Router';
import { store } from './utils/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
