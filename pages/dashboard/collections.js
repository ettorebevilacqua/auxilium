import { useEffect, useState } from "react";

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await fetch("/api/collections");
        const data = await response.json();

        if (response.ok) {
          setCollections(data.custom_collections || []);
        } else {
          throw new Error(data.error || "Errore sconosciuto");
        }
      } catch (err) {
        console.error("Errore nel recuperare le collezioni:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  return (
    <div>
      <h2>Collezioni Shopify</h2>
      {loading && <p>Caricamento...</p>}
      {error && <p style={{ color: "red" }}>Errore: {error}</p>}
      <ul>
        {collections.map((col) => (
          <li key={col.id}>{col.title}</li>
        ))}
      </ul>
    </div>
  );
}

  