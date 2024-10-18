import './App.css';
import Toolbar from './UI/Toolbar/Toolbar.tsx';
import Register from './features/users/Register.tsx';
import { Route, Routes } from 'react-router-dom';
import Login from './features/users/Login.tsx';
import Home from './containers/Home/Home.tsx';
import Cocktails from './containers/Cocktails/Cocktails.tsx';
import CocktailForm from './containers/Cocktails/CocktailForm.tsx';
import OneCocktail from './containers/Cocktails/OneCocktail.tsx';
import { selectUser } from './features/users/usersSlice.ts';
import { useAppSelector } from './app/hooks.ts';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute.tsx';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/cocktails"
            element={
              <ProtectedRoute isAllowed={user}>
                <Cocktails />
              </ProtectedRoute>
            }
          />
          <Route path="/cocktails/:id" element={<OneCocktail />} />
          <Route
            path="/add-cocktail"
            element={
              <ProtectedRoute isAllowed={user}>
                <CocktailForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
