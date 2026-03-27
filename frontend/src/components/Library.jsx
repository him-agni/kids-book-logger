import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Library = ({ userId }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/logs/${userId}`);
        setLogs(data.logs);
      } catch (error) {
        console.error('Failed to load library (Ensure backend is running)', error);
      }
    };
    if (userId) fetchLogs();
  }, [userId]);

  const toggleFavorite = async (id) => {
    try {
      const { data } = await axios.patch(`http://localhost:5000/api/logs/${id}/favorite`);
      setLogs(logs.map(log => log._id === id ? data.log : log));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteLog = async (id) => {
    if (!window.confirm("Are you sure you want to magically poof this book away? 🗑️")) return;
    try {
      await axios.delete(`http://localhost:5000/api/logs/${id}`);
      setLogs(logs.filter(log => log._id !== id));
    } catch (err) {
      console.error("Failed to delete log", err);
    }
  };

  const shareList = () => {
    // Simulated sharing feature
    navigator.clipboard.writeText(`http://localhost:5173/share/${userId}`);
    alert('Public link copied to clipboard! (Feature placeholder) 📤');
  }

  return (
    <div className="animate-pop">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>My Magic Library 📖</h2>
        <button className="btn btn-accent" onClick={shareList}>Share My List 📤</button>
      </div>
      
      {logs.length === 0 ? (
        <div className="card">
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Your library is empty. Go discover some amazing books!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {logs.map(log => (
            <div key={log._id} className="card" style={{ padding: '1.5rem', border: log.isFavorite ? '4px solid #FFE66D' : '4px solid white', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h4 style={{ margin: 0, paddingRight: '4rem', fontSize: '1.2rem', lineHeight: '1.4' }}>{log.bookDetails.title}</h4>
                <div style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <button 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', padding: 0 }} 
                    onClick={() => deleteLog(log._id)}
                    title="Remove from Library"
                  >
                    🗑️
                  </button>
                  <button 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.8rem', padding: 0 }} 
                    onClick={() => toggleFavorite(log._id)}
                    title="Favorite this book!"
                  >
                    {log.isFavorite ? '⭐️' : '☆'}
                  </button>
                </div>
              </div>
              <p style={{ margin: '0.5rem 0 1.5rem 0', color: '#666', fontWeight: 'bold' }}>{log.bookDetails.author}</p>
              
              <div>
                <span style={{ 
                  background: log.status === 'completed' ? 'var(--secondary)' : 'var(--primary)', 
                  color: 'white', 
                  padding: '6px 12px', 
                  borderRadius: '12px', 
                  fontSize: '0.85rem', 
                  fontWeight: '800',
                  letterSpacing: '0.5px'
                }}>
                  {log.status === 'completed' ? 'YAY! FINISHED 🎉' : 'READING NOW 📖'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Library;
