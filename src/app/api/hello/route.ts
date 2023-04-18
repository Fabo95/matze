import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const res = await Promise.resolve('HIIIA');

  console.log(res);

  return NextResponse.json(res);
}
