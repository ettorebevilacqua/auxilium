// pages/dashboard/collections.js
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);

  // Effettua il fetch delle collezioni dalla API route
  useEffect(() => {
    async function fetchCollections() {
      try {
        const res = await fetch('/api/collections');
        const data = await res.json();
        // Se l'endpoint restituisce { custom_collections: [...] }:
        setCollections(data.custom_collections || []);
      } catch (error) {
        console.error('Errore nel recuperare le collezioni:', error);
      }
    }
    fetchCollections();
  }, []);

  // Gestione della selezione: aggiunge o rimuove l'id della collezione
  const handleSelection = (id) => {
    setSelectedCollections((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar con i menu della dashboard */}
      <Sidebar />
      <div style={{ flex: 1, padding: '1rem', boxSizing: 'border-box' }}>
        <Header />
        <main>
          <h2>Collezioni Shopify</h2>
          {collections.length === 0 ? (
            <p>Caricamento collezioni...</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {collections.map((col) => (
                <li
                  key={col.id}
                  style={{
                    marginBottom: '1rem',
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '0.5rem'
                  }}
                >
                  <label style={{ cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      style={{ marginRight: '0.5rem' }}
                      checked={selectedCollections.includes(col.id)}
                      onChange={() => handleSelection(col.id)}
                    />
                    {col.title}
                  </label>
                </li>
              ))}
            </ul>
          )}
          {/* Se vuoi, puoi aggiungere un bottone per elaborare le selezioni */}
          {selectedCollections.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <p>Collezioni selezionate: {selectedCollections.join(', ')}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
