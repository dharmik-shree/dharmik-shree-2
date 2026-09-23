import { NextResponse } from 'next/server';
import { getAllPujas } from '@/lib/pujaData';

export async function GET() {
  try {
    const pujas = await getAllPujas();
    return NextResponse.json({ success: true, pujas });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to fetch pujas' },
      { status: 500 }
    );
  }
}
