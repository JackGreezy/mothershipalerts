import Home from './home';
import './App.css'; 
import Unsubscribe from './Unsubscribe';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
      </Routes>
    </Router>
  );
}

export default App;
