export default function handler(req, res) {
    // Qui puoi integrare la logica del vecchio codice per ottenere dati dinamici
    // Ad esempio, recuperare dati da un database o effettuare calcoli
    const dashboardData = {
      message: 'Dati della dashboard aggiornati dal backend'
      // Aggiungi altre proprietà se necessarie
    };
  
    res.status(200).json(dashboardData);
  }  