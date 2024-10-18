import { NavLink } from 'react-router-dom';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';
import { useAppSelector } from '../../app/hooks';
import {
  selectGoogleAccount,
  selectUser,
} from '../../features/users/usersSlice';

const Toolbar = () => {
  const user = useAppSelector(selectUser);
  const googleAccount = useAppSelector(selectGoogleAccount);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink to="/" className="navbar-brand d-flex ">
          <p className="me-2 mb-0">Cocktail builder</p>
        </NavLink>
        <div>
          {user ? (
            <UserMenu user={user} googleAccount={googleAccount} />
          ) : (
            <AnonymousMenu />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
