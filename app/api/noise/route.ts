import { noiseRepository } from "@/lib/noise/repository";
import { NextResponse } from "next/server";

export async function GET() {
  const noises = await noiseRepository.findManyNoises();

  return NextResponse.json(noises);
}