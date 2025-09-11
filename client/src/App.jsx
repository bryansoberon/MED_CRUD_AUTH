import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import TaskFormPage from './pages/TasksFormPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';

import ProtectedRoute from './ProtectedRoute';

function App(){
    return (
      <AuthProvider>
        <TaskProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/register" element={<RegisterPage/>} />

              <Route element={<ProtectedRoute/>}>
                <Route path="/tasks" element={<TasksPage/> } />
                <Route path="/add-task" element={<TaskFormPage/>} />
                <Route path="/tasks/:id" element={<TaskFormPage/>} />
                <Route path="/profile" element={<ProfilePage/>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TaskProvider>
      </AuthProvider>
    );
}

export default App