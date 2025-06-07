'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
      });
  }, [id]);

  const handleUpdate = async () => {
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    router.refresh();
  };

  const handleDelete = async () => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    router.push('/');
    router.refresh();
  };

  if (!post) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-3"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full h-40 mb-3"
      />
      <div className="flex gap-2">
        <button
          onClick={handleUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

