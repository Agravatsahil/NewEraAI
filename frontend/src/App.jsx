import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SnackbarProvider from './components/SnackbarProvider';
import { AppContext } from './Context';
import { v4 as uuidv4 } from 'uuid';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [ currentThreadId, setCurrentThreadId ] = useState(uuidv4());
  const [prevChatId, setPrevChatId] = useState({ messages: [] });
  const [isNewChat, setIsNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);
  const providerValue = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currentThreadId,
    setCurrentThreadId,
    isNewChat,
    setIsNewChat,
    prevChatId,
    setPrevChatId,
    allThreads,
    setAllThreads,
  };


  return (
    <AppContext.Provider value={providerValue}>
      <SnackbarProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SnackbarProvider>
    </AppContext.Provider>
  );
}

export default App

