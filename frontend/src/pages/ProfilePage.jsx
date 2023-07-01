import { useContext, useState } from "react";
import { UserContext } from "../components/UserContext";
import axios from "axios";

export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);

  async function logout() {
    await axios.post("/logout");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  return (
    <div>
      {user && (
        <div className="text-center mt-16 max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-4">
            Logout
          </button>
        </div>
      )}
      {!user && (
        <div className="text-center mt-16 max-w-lg mx-auto">
          Log Out Successful!
        </div>
      )}
    </div>
  );
}
