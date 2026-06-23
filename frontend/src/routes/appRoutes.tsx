import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './protectedRoutes';

import DashboardLayout from '../components/DashboardLayout';
import Overview from '../pages/Overview';
import Doctors from '../pages/Doctors';
import Appointments from '../pages/Appointments';
import Profile from '../pages/Profile';
import LoginPage from '../pages/loginPage';
import RegisterPage from '../pages/RegisterPage';
import BookingPage from '../pages/BookingPage';

import LandingPage from '../pages/LandingPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register'element={<RegisterPage/>}/>

        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <DashboardLayout />
          </ProtectedRoutes>
        }>
          <Route index element={<Overview />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}