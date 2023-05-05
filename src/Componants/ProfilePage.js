import { useEffect } from "react";
import React, { useState } from "react";

function ProfilePage({ id }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          const errorData = await response.json();
          setError(errorData.error);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src={user.image} alt="Profile" />
      </div>
      <div className="profile-info">
        <h1>
          Welcome,{" "}
          {user.firstName + " " + user.maidenName + " " + user.lastName}!
        </h1>
        <p>Age: {user.age}</p>
        <p>Gender: {user.gender}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
