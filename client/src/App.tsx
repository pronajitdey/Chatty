import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import axios from "axios";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "./context/AuthContext";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";

const App = (): React.JSX.Element => {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
  axios.defaults.withCredentials = true;

  const { auth } = useContext<AuthContextType | null>(AuthContext)!;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={ auth ? <Navigate to="/chat" /> : <SignupPage /> } />
        <Route path="/login" element={auth ? <Navigate to="/chat" /> : <LoginPage />} />
        <Route path="/chat" element={ auth ? <ChatPage /> : <Navigate to="/" /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
