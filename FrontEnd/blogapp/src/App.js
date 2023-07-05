import React from 'react';
import './App.css';
import Header from './Components/Header';
import Post from './Components/Post';
import { Route, Routes } from "react-router-dom"
import Layout from './Components/Layout';
import IndexPage from './Components/IndexPage';
import LoginPage from './Components/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<IndexPage />} />
        <Route path={'/Components/login'} element={<LoginPage />} />
      </Route>
    </Routes>

  );
}

export default App;
