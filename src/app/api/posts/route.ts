import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const data = await req.json();
  const post = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
    },
  });
  return NextResponse.json(post);
}
