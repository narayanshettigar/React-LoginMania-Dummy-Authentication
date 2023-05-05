import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import LoginPage from './Componants/LoginPage';
import ProfilePage from './Componants/ProfilePage';
import './Styles.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async (loggedInUser) => {
    try {
      const response = await fetch(`https://dummyjson.com/users/${loggedInUser.id}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/profile" element={user ? <ProfilePage user={user} /> : null} />
      </Routes>
    </Router>
  );
}

export default App;
