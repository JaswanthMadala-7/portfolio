import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-28">
      <p className="text-muted">Error 404</p>
      <h1 className="mt-3 text-5xl">That page does not exist</h1>
      <p className="measure mt-4 text-muted">The link may be broken or the page may have moved.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
