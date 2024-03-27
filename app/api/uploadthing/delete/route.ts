import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi

export async function POST(req: Request) {
    const { userId } = auth();
    
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const requestBody = await req.json();
        const imageKey = requestBody.fileKeys[0];

        if (imageKey === undefined || typeof imageKey !== 'string') {
            console.error('Invalid imageKey:', imageKey);
            return new NextResponse('Invalid imageKey', { status: 400 });
        }

        const res = await utapi.deleteFiles(imageKey);
        return NextResponse.json(res);
    } catch (error) {
        console.error('Error at uploadthing/delete:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}