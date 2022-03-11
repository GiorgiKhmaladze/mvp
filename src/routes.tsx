import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/home';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { DashboardLayout } from './components/hoc/dashboardLayout';
import { Reports } from './components/reports';

export interface User {
  firstName: string,
  lastName: string,
  nickName: string,
}

function App() {
  const [user, setUser] = useState<User>({
    firstName: 'John',
    lastName: 'Doe',
    nickName: 'JD'
  })
  return (
    <Router>
      <>
        <Header user={user} />
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </DashboardLayout>
        <Footer />
      </>
    </Router>
  );
}

export default App;
