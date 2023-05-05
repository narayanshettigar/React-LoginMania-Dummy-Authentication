import { useState } from "react";
import ProfilePage from "./ProfilePage";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.ok) {
        const userData = await response.json();
        setUserId(userData.id);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while logging in.");
    }
  };

  if (userId) {
    return <ProfilePage id={userId} />;
  }

  return (
    
    <form onSubmit={handleSubmit}>
        <h1>Login Here</h1>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginPage;
