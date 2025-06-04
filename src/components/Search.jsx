import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByUsername } from "../services/operations/searchAPI";

const Search = ({ setActiveSection, setSelectedUser }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      setLoading(true);
      const response = await dispatch(searchByUsername(query.trim()));
      setUsers(response || []);
      setLoading(false);
    }
  };

  const openProfile = (user) => {
    setSelectedUser(user);
    setActiveSection("datailedUserProfile");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        className="w-full px-4 py-2 border rounded-md"
      />
      <p className="text-sm text-gray-500 mt-1 text-center">"Press Enter to search"</p>

      {loading ? (
        <p className="mt-4 text-gray-600">Searching...</p>
      ) : users.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {users.map((user, index) => (
            <li
              key={index}
              onClick={() => openProfile(user)}
              className="p-4 rounded-md flex gap-4 items-center cursor-pointer hover:bg-gray-100 transition"
            >
              <img
                src={user.profilePictureUrl || "/default-avatar.png"}
                alt="User"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-gray-500">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        query && <p className="mt-4 text-gray-600">No users found.</p>
      )}
    </div>
  );
};

export default Search;