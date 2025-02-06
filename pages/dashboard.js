// pages/dashboard.js
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar a sinistra */}
      <Sidebar />

      {/* Contenuto principale a destra */}
      <div style={{ flex: 1, padding: '1rem', boxSizing: 'border-box' }}>
        <Header />
        <main>
          <h2>Dashboard Content</h2>
          <p>Qui verranno visualizzate le informazioni principali della dashboard.</p>
        </main>
      </div>
    </div>
  );
}
