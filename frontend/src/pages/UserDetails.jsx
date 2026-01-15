import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../services/user";
import {
  socketService,
  SOCKET_EVENT_USER_UPDATED,
  SOCKET_EMIT_USER_WATCH,
} from "../services/socket-service";

export function UserDetails() {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUser(params.id);

    socketService.emit(SOCKET_EMIT_USER_WATCH, params.id);
    const handleUserUpdated = updatedUser => {
      setUser(updatedUser);
    };
    socketService.on(SOCKET_EVENT_USER_UPDATED, handleUserUpdated);

    return () => {
      socketService.off(SOCKET_EVENT_USER_UPDATED, handleUserUpdated);
    };
  }, [params.id]);

  async function loadUser(userId) {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await userService.getById(userId);
      setUser(userData);
    } catch (err) {
      setError(`Error loading user: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="user-details">
      <h1>User Details</h1>
      {isLoading && "Loading..."}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {user && (
        <div>
          <h3>{user.fullname}</h3>
          <img src={user.imgUrl} style={{ width: "100px" }} />
          <pre> {JSON.stringify(user, null, 2)} </pre>
        </div>
      )}
    </section>
  );
}
