import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'ipo-intelligence-frontend',
    timestamp: new Date().toISOString(),
  })
}
