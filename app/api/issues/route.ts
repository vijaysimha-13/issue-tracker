import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from '@/prisma/client';

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
})
export async function POST(request: NextRequest){
    const requestBody = await request.json();
    console.log(requestBody);
    const validation = createIssueSchema.safeParse(requestBody);
    if(!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400});
    }
    const newIssue = await prisma.issue.create({
        data: {title: requestBody.title, description: requestBody.description}
    })
    return NextResponse.json(newIssue, {status: 201});
}