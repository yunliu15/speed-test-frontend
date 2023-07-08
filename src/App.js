import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthProvider';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth/>}>
                <Route path="/" element={<Dashboard />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>      
    </BrowserRouter>  
  );
}

export default App;
