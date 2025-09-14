import { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export default function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const emailLogin = async (e) => {
    e.preventDefault();
    setBusy(true); setMsg("");
    try { await signInWithEmailAndPassword(auth, email.trim(), pass); setMsg("Signed in."); }
    catch (e) { setMsg(e.message); }
    finally { setBusy(false); }
  };

  const googleLogin = async () => {
    setBusy(true); setMsg("");
    try { await signInWithPopup(auth, googleProvider); setMsg("Signed in with Google."); }
    catch (e) { setMsg(e.message); }
    finally { setBusy(false); }
  };

  const doSignOut = async () => {
    setBusy(true); setMsg("");
    try { await signOut(auth); setMsg("Signed out."); }
    catch (e) { setMsg(e.message); }
    finally { setBusy(false); }
  };

  // --- Inline styles so the layout is perfect even without Tailwind ---
  const outer = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    background: "linear-gradient(135deg,#0f172a,#1f2937)", // slate-900 -> slate-800
  };
  const card = {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 24px 60px rgba(0,0,0,.35)",
  };
  const title = {
    margin: 0,
    textAlign: "center",
    fontSize: "28px",
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-0.02em",
  };
  const subtitle = {
    textAlign: "center",
    color: "#64748b",
    marginTop: "6px",
    marginBottom: "24px",
    fontSize: "14px",
  };
  const input = {
    width: "100%",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    padding: "12px 14px",
    fontSize: "16px",
    outline: "none",
    marginBottom: "12px",
  };
  const primaryBtn = {
    width: "100%",
    border: "0",
    borderRadius: "12px",
    padding: "12px 16px",
    fontWeight: 700,
    fontSize: "16px",
    background: "#4f46e5", // indigo-600
    color: "#fff",
    cursor: "pointer",
  };
  const dividerWrap = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "16px 0",
  };
  const dividerLine = { height: "1px", background: "#e2e8f0", flex: 1 };
  const dividerText = { color: "#94a3b8", fontSize: "12px" };
  const googleBtn = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    padding: "12px 16px",
    background: "#fff",
    color: "#0f172a",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
  };
  const gIcon = { width: 20, height: 20, objectFit: "contain", flex: "0 0 20px" };
  const msgStyle = { textAlign: "center", marginTop: "12px", color: "#475569", fontSize: "14px" };

  return (
    <div style={outer}>
      <div style={card}>
        <h1 style={title}>Dev@Deakin</h1>
        <p style={subtitle}>Sign in to continue</p>

        {user ? (
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#334155", marginBottom: 24 }}>
              You are signed in as <b>{user.email}</b>
            </p>
            <button style={{ ...primaryBtn, background: "#ef4444" }} onClick={doSignOut} disabled={busy}>
              {busy ? "Signing out…" : "Sign out"}
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={emailLogin}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={input}
              />
              <input
                type="password"
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Password"
                style={input}
              />
              <button type="submit" style={primaryBtn} disabled={busy}>
                {busy ? "Signing in…" : "Sign in"}
              </button>
            </form>

            <div style={dividerWrap}>
              <div style={dividerLine} />
              <span style={dividerText}>or</span>
              <div style={dividerLine} />
            </div>

            {/* Google button with fixed 20×20 logo */}
            <button onClick={googleLogin} style={googleBtn} disabled={busy} aria-label="Continue with Google">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                style={gIcon}
              />
              {busy ? "Please wait…" : "Continue with Google"}
            </button>
          </>
        )}

        {msg && <p style={msgStyle}>{msg}</p>}
      </div>
    </div>
  );
}

