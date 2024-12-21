// src/App.jsx
import GitWrapApp from './components/Git';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const App = () => {

  return (
    <div>
      <Navbar/>
      <GitWrapApp/>
      <Footer/>
    </div>
  );
};

export default App;