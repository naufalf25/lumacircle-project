import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncPreloadProcess } from './states/isPreload/action';
import Navbar from './components/homepage/Navbar';
import RegisterPage from './pages/RegisterPage';
import { asyncUnsetAuthUser } from './states/authUser/action';
import SignInPage from './pages/SignInPage';
import { useState } from 'react';
import LeaderboardsPage from './pages/LeaderboardsPage';
import DetailPage from './pages/DetailPage';
import Loading from './components/Loading';

function App() {
  const {
    authUser = null,
    loading,
    isPreload = false,
  } = useSelector((states) => states);
  const [nav, setNav] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
    setNav(false);
  };

  if (isPreload && loading) return <Loading />;

  return (
    <>
      <header>
        <Navbar
          loginPage={authUser ? false : true}
          authUser={authUser}
          onSignOut={onSignOut}
          nav={nav}
          setNav={setNav}
        />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/thread/:id" element={<DetailPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
