import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return new Response("Forbidden", { status: 403 });
  }

  const { title, description, thumbnail, featured } = await req.json();

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
