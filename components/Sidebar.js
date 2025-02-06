// components/Sidebar.js
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside
      style={{
        width: '200px',
        backgroundColor: '#f0f0f0',
        padding: '1rem',
        boxSizing: 'border-box'
      }}
    >
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '1rem' }}>
            <Link href="/dashboard/setup">
              <a>Setup</a>
            </Link>
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <Link href="/dashboard/collections">
              <a>Collezione</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/c">
              <a>C</a>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
