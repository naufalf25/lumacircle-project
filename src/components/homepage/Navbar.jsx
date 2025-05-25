import React from 'react';
import { BiLogIn } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Button from '../Button';
import PropTypes from 'prop-types';
import { MdLeaderboard } from 'react-icons/md';
import { PiSignOutBold } from 'react-icons/pi';
import { motion } from 'motion/react';

function Navbar({
  loginPage = false,
  authUser = null,
  onSignOut = null,
  nav,
  setNav,
}) {
  const { avatar } = authUser || {};

  return (
    <section className="flex items-center justify-between bg-white p-4 lg:px-20">
      <Link to="/" className="flex items-center gap-4">
        <img src="/logotitle.png" alt="logo" className="w-10" />
        <h1 className="text-2xl font-bold">
          Luma<span className="text-primary">Circle</span>
        </h1>
      </Link>
      {loginPage && (
        <Link
          to="/login"
          className="border-secondary bg-secondary hover:text-secondary flex items-center gap-4 rounded-full border px-4 py-2 text-white hover:bg-transparent"
        >
          <BiLogIn className="text-2xl" />
          <h1 className="font-semibold">Login</h1>
        </Link>
      )}
      {!loginPage && authUser && (
        <div className="relative">
          <Button onClick={() => setNav(!nav)}>
            <img src={avatar} alt="profile" className="w-10 rounded-full" />
          </Button>
          {nav && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
              className="absolute top-16 right-0 z-10"
            >
              <nav className="flex flex-col items-start gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-slate-600 shadow-lg">
                <Link to="/leaderboards" className="w-full">
                  <div className="flex items-center gap-2">
                    <MdLeaderboard className="text-2xl" />
                    <p>Leaderboards</p>
                  </div>
                </Link>
                <Button
                  onClick={onSignOut}
                  className="mt-2 w-full border-t border-t-slate-700 pt-4 text-start"
                >
                  <div className="flex items-center gap-2">
                    <PiSignOutBold className="text-2xl" />
                    <p>Logout</p>
                  </div>
                </Button>
              </nav>
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navbar.propTypes = {
  loginPage: PropTypes.bool.isRequired,
  authUser: PropTypes.shape(authUserShape).isRequired,
  onSignOut: PropTypes.func.isRequired,
  nav: PropTypes.bool.isRequired,
  setNav: PropTypes.func.isRequired,
};

export default Navbar;
