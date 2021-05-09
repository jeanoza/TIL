import React, { useState, useEffect } from "react";
import axios from "axios";

function UserProfile({ id }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  //avec async/await
  const getUser = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      setUserData(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    //getUser(id);
    //avec .then()
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => setUserData(response.data))
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>Il n'y a pas d'user data correspondant</div>;
  return (
    <div>
      <p>
        <b>Username:</b>
        {userData.username}
      </p>
      <p>
        <b>Email:</b>
        {userData.email}
      </p>
    </div>
  );
}

export default UserProfile;
