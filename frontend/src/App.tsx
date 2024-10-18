import './App.css'
import Toolbar from "./UI/Toolbar/Toolbar.tsx";
import Register from "./features/users/Register.tsx";
import {Route, Routes} from "react-router-dom";
import Login from "./features/users/Login.tsx";

const App = () => {
  return (
      <>
          <header>
              <Toolbar/>
          </header>
          <main className="mt-5">
              <Routes>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/login" element={<Login/>}/>
              </Routes>
          </main>
      </>
  )
};

export default App
