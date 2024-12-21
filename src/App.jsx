// src/App.jsx
import { useEffect } from 'react';
import GitWrapApp from './components/Git';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {emojiCursor} from "cursor-effects";

const App = () => {
  useEffect(() => {
    new emojiCursor({ emoji: ["👻", "💀", "☠️"] });
  }, []);

  return (
    <div className="bg-dot-10-s-2-blue-950 bg-opacity-10">
      <Navbar />
      <GitWrapApp />
      <Footer />
    </div>
  );
};

export default App;
