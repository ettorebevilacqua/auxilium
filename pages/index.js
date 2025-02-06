import Link from 'next/link';

export default function Home() {
    console.log ("env", process.env)
  return (
    <div>
      <h1>Hello world *</h1>
      <Link href="/dashboard">
        <a>Vai alla Dashboard</a>
      </Link>
    </div>
  );
}
