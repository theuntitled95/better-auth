import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Background pattern */}
      <div className="container-bg"></div>

      {/* Content */}
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
