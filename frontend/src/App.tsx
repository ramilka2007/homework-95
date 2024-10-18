import './App.css'
import Toolbar from "./UI/Toolbar/Toolbar.tsx";
import Register from "./features/users/Register.tsx";
import {Route, Routes} from "react-router-dom";
import Login from "./features/users/Login.tsx";
import Home from "./containers/Home/Home.tsx";
import Cocktails from "./containers/Cocktails/Cocktails.tsx";
import CocktailForm from "./containers/Cocktails/CocktailForm.tsx";

const App = () => {
  return (
      <>
          <header>
              <Toolbar/>
          </header>
          <main className="mt-5">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/cocktails" element={<Cocktails/>}/>
                  <Route path="/add-cocktail" element={<CocktailForm/>}/>
              </Routes>
          </main>
      </>
  )
};

export default App
