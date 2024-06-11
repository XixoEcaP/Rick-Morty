import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterListView from './components/CharacterListView';
import CharacterView from './components/CharacterView';
import './App.css';

const App = () => (
  <Router basename="/Rick-Morty">
    <Routes>
      <Route path="/" element={<CharacterListView />} />
      <Route path="/character/:id" element={<CharacterView />} />
    </Routes>
  </Router>
);

export default App;



