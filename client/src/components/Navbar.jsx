// client/src/components/Navbar.jsx
function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b border-gray-200">
      <span className="text-lg font-semibold text-gray-800">Finance App</span>
      <button
        onClick={handleLogout}
        className="text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md px-3 py-1.5 transition-colors"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;