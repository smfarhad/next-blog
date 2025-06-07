import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();
  const session = await getServerSession(authOptions);
  return (
    <main className="p-4 max-w-2xl mx-auto">
      {session ? (
        <div className="flex justify-between items-center mb-4">
          <p>Signed in as {session.user?.email}</p>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="text-red-600">
              Sign Out
            </button>
          </form>
        </div>
      ) : (
        <form action="/api/auth/signin" method="POST">
          <button type="submit" className="text-blue-600">
            Sign In
          </button>
        </form>
      )}
      <h1 className="text-3xl font-bold mb-4">My Blog</h1>
      <Link href="/new" className="text-blue-600 underline">
        + New Post
      </Link>
      <ul className="mt-6 space-y-4">
        {posts.map((post: any) => (
          <li key={post.id} className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold">
              <Link
                href={`/post/${post.id}`}
                className="text-blue-700 underline"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
