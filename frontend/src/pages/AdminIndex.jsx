import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { userService } from "../services/user";

/*
TODO:
This component is not used correctly in the project. It should be rebuilit with store state and actions. and with redux.
*/

export function AdminIndex() {
  const navigate = useNavigate();
  const currentUser = useSelector(storeState => storeState.auth.currentUser);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const usersList = await userService.getUsers();
      setUsers(usersList);
    } catch (err) {
      setError(`Error loading users: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser && !currentUser.isAdmin) {
      navigate("/");
      return;
    }
    loadUsers();
  }, [currentUser, navigate, loadUsers]);

  async function handleDeleteUser(userId) {
    try {
      await userService.remove(userId);
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
    } catch (err) {
      setError(`Error deleting user: ${err.message}`);
    }
  }

  return (
    <section className="admin">
      {isLoading && "Loading..."}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {users && users.length > 0 && (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <pre>{JSON.stringify(user, null, 2)}</pre>
              <button onClick={() => handleDeleteUser(user._id)}>
                Remove {user.username}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
