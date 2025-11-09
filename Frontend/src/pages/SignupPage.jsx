// src/pages/SignupPage.jsx
const SignupPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-300 via-blue-200 to-purple-300">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Create Account</h2>
        <form>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
