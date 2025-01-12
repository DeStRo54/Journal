import React from 'react';
import { useDispatch } from 'react-redux';

import { EntryContext } from './modules/AuthContext';
import { Router } from '@/components/modules/Router/Router';
import { getUserData } from '@/utils/api/requests/user/get';
import { getUserRefresh } from '@/utils/api/requests/user/refresh';
import { logIn } from '@/utils/redux/storeSlices/userSlice/slice';

function App() {
  const dispatch = useDispatch();
  const { isEntry } = React.useContext(EntryContext);
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
    const expiresDate = new Date(document.cookie.match(cookie)?.input?.split('=')[2].split('+')[0] as string);
    const currentDate = new Date();
    expiresDate.setHours(expiresDate.getHours() + 3);
    return expiresDate.getTime() - currentDate.getTime();
  };

  const userSessionRefresh = () => {
    const timeToRefresh = getTimeUpdateSession('session_expires=') - 60 * 1000;

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

  if (isEntry) {
    userSessionRefresh();
  }

  if (!isEntry && document.cookie.match('session_key=')) {
    refreshCookies();
    setUserData();
    userSessionRefresh();
  }

  return <Router />;
}

export default App;
