import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  const { title, description, thumbnail, featured } = body;

const newCourse = await prisma.course.create({
  data: {
    title,
    description,
    thumbnail,
    featured,
    creatorId: session.user.id, 
  },
});


  return Response.json(newCourse);
}
