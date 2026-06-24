import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { mensagemErroArmazenamento } from "@/lib/proposta-storage-env";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        maximumSizeInBytes: 15 * 1024 * 1024,
        addRandomSuffix: true,
        pathname: `propostas/images/${pathname}`,
      }),
      onUploadCompleted: async () => {
        // opcional: log ou persistência extra
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { erro: mensagemErroArmazenamento(error) },
      { status: 503 },
    );
  }
}
