import { noiseRepository } from "@/lib/noise/repository";
import { NextResponse } from "next/server";

function requireNumber(value: string | null, name: string) {
  if (value == null) throw new Error(`Missing ${name}`);

  const num = Number(value);
  if (Number.isNaN(num)) throw new Error(`Invalid ${name}`);
  
  return num;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const n = requireNumber(searchParams.get("n"), "n");
  const e  = requireNumber(searchParams.get("e"), "e");
  const s = requireNumber(searchParams.get("s"), "s");
  const w  = requireNumber(searchParams.get("w"), "w");

  const noises = await noiseRepository.findManyNoises({ 
    n, e, s, w,
    include: {category: true}
  });

  return NextResponse.json(noises);
}