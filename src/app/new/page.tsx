'use client';
import { useSession, signIn } from 'next-auth/react';
// ... rest of your imports

export default function NewPost() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return (
    <div className="p-4">
      <p>You must be signed in to post.</p>
      <button onClick={() => signIn()} className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2">
        Sign In
      </button>
    </div>
  );

  // ... your existing post creation form
}
