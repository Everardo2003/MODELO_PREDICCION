import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import FormPage from './pages/Form/FormPage'
import Login from './pages/Login/Login'
import Result from './pages/Form/Result'

function App() {
  // Estado para verificar si puede acceder al formulario
  const [isAllowed, setIsAllowed] = useState(
    localStorage.getItem("canAccessForm") === "true"
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={<Login onAccess={() => setIsAllowed(true)} />}
        />
        <Route
          path="/form"
          element={
            isAllowed ? <FormPage /> : <Navigate to="/login" replace />
          }
        />
        <Route 
          path="/result"
          element={
            isAllowed ? <Result /> : <Navigate to={"/login"} replace/>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
