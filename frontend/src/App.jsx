import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import './index.css';

// Components
import BookSearch from './components/BookSearch';
import Library from './components/Library';
import AIBuddy from './components/AIBuddy';

const Home = ({ userId }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div className="card animate-pop" style={{ background: 'linear-gradient(135deg, var(--tertiary), #FFF)' }}>
      <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Welcome to BookLog! 📚</h2>
      <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#555' }}>Search for books to add to your reading list below.</p>
    </div>
    <BookSearch userId={userId} />
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async (action) => {
    try {
      if (action === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <header className="navbar">
          <h1 className="logo">BookLog 🌟</h1>
          <nav className="nav-links">
            {user ? (
              <>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/library" className="nav-link">My Library</Link>
                <Link to="/chatbot" className="nav-link">AI Buddy</Link>
                <button className="btn btn-secondary" onClick={() => signOut(auth)}>Logout</button>
              </>
            ) : (
              <p>Sign in to start exploring!</p>
            )}
          </nav>
        </header>

        <main>
          {!user ? (
            <div className="card animate-pop" style={{maxWidth: '400px', margin: '0 auto'}}>
              <h2>Welcome! 👋</h2>
              <input 
                className="input-field" 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={{marginBottom: '1rem'}}
              />
              <input 
                className="input-field" 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={{marginBottom: '1rem'}}
              />
              <div style={{display: 'flex', gap: '1rem'}}>
                <button className="btn" onClick={() => handleAuth('login')}>Login</button>
                <button className="btn btn-accent" onClick={() => handleAuth('register')}>Sign Up</button>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Home userId={user.uid} />} />
              <Route path="/library" element={<Library userId={user.uid} />} />
              <Route path="/chatbot" element={<AIBuddy age={user.age} />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
