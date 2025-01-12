import { useDispatch } from 'react-redux';

import { Router } from './components/modules/Router/Router';
import { getUserData } from './utils/api/requests/user/get';
import { logIn } from './utils/redux/storeSlices/userSlice/slice';

function App() {
  const dispatch = useDispatch();
  if (document.cookie.match('session_key=')) {
    const setUserData = async () => {
      try {
        const { data } = await getUserData(undefined);
        dispatch(
          logIn({
            role: 3, //data.role
            name: data.name,
            surname: data.surname,
            email: data.email,
            group_name: data.group_name
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    setUserData();
  }
  return <Router />;
}

export default App;
