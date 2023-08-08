import Link from "next/link";

export default function HomePage() {
  return (
    <div className="home">
      <div className="intro">
        <h1>I'm a Huge venn</h1>

        <Link href="/build">Create Venn</Link>
      </div>
    </div>
  );
}
