import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./leaderboard.css";

const Leaderboard = () => {
  const API = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API}/api/leaderboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          const filteredUsers = data.filter(
            (user) => user.scores?.overallScore > 0
          );
          setUsers(filteredUsers);
        } else {
          setError(data.message || "Failed to fetch leaderboard data");
        }
      } catch (err) {
        setError("Error fetching leaderboard data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const handleViewScores = (user) => {
    setSelectedUser(user);
  };

  const closePopup = () => {
    setSelectedUser(null);
  };

  if (loading) {
    return <div className="leaderboard-container">Loading...</div>;
  }

  if (error) {
    return (
      <div className="leaderboard-container">
        <h1>Error</h1>
        <p>{error}</p>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      {users.length > 0 ? (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Last Assessment</th>
              <th>Overall Score</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
                <td>{user.scores.overallScore}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => handleViewScores(user)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users have taken the assessment yet.</p>
      )}
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

      {selectedUser && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{selectedUser.username}'s Scores</h2>
            <table className="user-details-table">
              <thead>
                <tr>
                  <th>Assessment</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedUser.scores || {}).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="close-btn" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;





