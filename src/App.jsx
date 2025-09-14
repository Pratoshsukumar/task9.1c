import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";

function Home() {
  return (
    <div className="min-h-screen grid place-items-center bg-slate-900">
      <div className="text-white text-center space-y-4">
        <h1 className="text-3xl font-bold">Home Page</h1>
        <Link
          to="/login"
          className="inline-block rounded-xl px-4 py-2 bg-white text-slate-900 font-semibold"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* default: redirect to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        {/* optional: keep Home available */}
        <Route path="/home" element={<Home />} />
        {/* catch-all: also go to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
