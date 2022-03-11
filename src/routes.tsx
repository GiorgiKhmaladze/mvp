import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/home';
import { Header } from './components/header';

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
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
