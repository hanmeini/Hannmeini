import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  
  if (!token || !projectId) {
    return NextResponse.json({ error: 'Vercel environment variables are not set' }, { status: 500 });
  }

  // Mengambil data untuk 7 hari terakhir
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // Parameter query string
  const params = new URLSearchParams({
    since: sevenDaysAgo,
    until: new Date().toISOString(),
    filter: '{}',
  });

  // URL API Vercel yang benar
  const apiUrl = `https://api.vercel.com/v9/projects/${projectId}/analytics/data?${params.toString()}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 3600, // Cache data selama 1 jam
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Vercel Analytics Error]', data); // ✅ tambahkan log
      throw new Error(data.error?.message || 'Failed to fetch Vercel Analytics data');
    }

    
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}