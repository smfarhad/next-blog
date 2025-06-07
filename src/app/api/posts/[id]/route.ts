import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({ where: { id: Number(params.id) } });
  return NextResponse.json(post);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updated = await prisma.post.update({
    where: { id: Number(params.id) },
    data: {
      title: data.title,
      content: data.content,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.post.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ success: true });
}