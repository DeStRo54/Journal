import { useDispatch } from 'react-redux';

import { Router } from './components/modules/Router/Router';
import { getUserData } from './utils/api/requests/user/get';
import { getUserRefresh } from './utils/api/requests/user/refresh';
import { logIn } from './utils/redux/storeSlices/userSlice/slice';

function App() {
  const dispatch = useDispatch();

  const refreshCookies = () => {
    getUserRefresh()
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
  };

  const setUserData = () => {
    getUserData()
      .then((res) => res.data)
      .then((data) => {
        dispatch(
          logIn({
            role: 3, //data.role
            name: data.name,
            surname: data.surname,
            email: data.email,
            group_name: data.group_name
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTimeUpdateSession = (cookie: string) => {
    const a = new Date(document.cookie.match(cookie)?.input?.split('=')[2].split('+')[0] as string);
    const b = new Date();
    a.setHours(a.getHours() + 3);
    return a.getTime() - b.getTime();
  };

  const userSessionRefresh = () => {
    // const timeToRefresh = getTimeUpdateSession('session_expires=') - 60 * 1000;
    const timeToRefresh = getTimeUpdateSession('session_expires=') - 20 * 1000;

    console.log(timeToRefresh);
    setTimeout(() => {
      (async () => {
        try {
          await getUserRefresh();
          userSessionRefresh();
        } catch (error) {
          console.log(error);
        }
      })();
    }, timeToRefresh);
  };

  // if (Boolean(name)) {
  //   userSessionRefresh();
  // }

  if (document.cookie.match('session_key=')) {
    refreshCookies();
    userSessionRefresh();
    setUserData();
  }
  return <Router />;
}

export default App;
