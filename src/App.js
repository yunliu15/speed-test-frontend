import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MessageLayout from './components/MessageLayout';
import { AuthProvider } from './context/AuthProvider';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProjectPage from './components/ProjectPage';
import DomainPage from './components/DomainPage';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<NotFound/>}/>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth/>}>
                <Route element={<MessageLayout/>} >
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/projects" element={<Dashboard />} />
                  <Route path="/projects/:id" element={<ProjectPage />} />
                  <Route path="/projects/:id/domains/:domainid" element={<DomainPage />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>      
    </BrowserRouter>  
  );
}

export default App;
