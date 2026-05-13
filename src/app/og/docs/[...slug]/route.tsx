import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const logoBuffer = await fetch(
    new URL('https://r2.diamondhost.tw/logo.png'),
  ).then((res) => res.arrayBuffer());
  const logoBase64 = `data:image/png;base64,${Buffer.from(logoBuffer).toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#030712',
          backgroundImage: 'radial-gradient(circle at 0% 0%, #1e293b 0%, #030712 100%)',
          padding: '80px 100px',
          position: 'relative',
        }}
      >
        <div style={{
          position: 'absolute',
          right: '-50px',
          bottom: '-50px',
          width: '600px',
          height: '600px',
          border: '1px solid rgba(59, 130, 246, 0.1)',
          borderRadius: '100px',
          transform: 'rotate(20deg)',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '80px', zIndex: 10 }}>
          <img
            src={logoBase64}
            width={60}
            height={60}
            style={{ borderRadius: '14px', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '32px', color: 'white', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}>
              鑽石託管
            </span>
            <span style={{ fontSize: '14px', color: '#60a5fa', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
              DiamondHost Docs
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, zIndex: 10 }}>
          <h1
            style={{
              fontSize: '92px',
              fontWeight: 900,
              margin: '0 0 24px 0',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              backgroundImage: 'linear-gradient(to right, #ffffff, #94a3b8)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
            }}
          >
            {page.data.title}
          </h1>

          <p
            style={{
              fontSize: '32px',
              color: '#94a3b8',
              maxWidth: '800px',
              margin: 0,
              lineHeight: 1.5,
              fontWeight: 400,
              display: 'flex',
            }}
          >
            {page.data.description}
          </p>
        </div>

        <div style={{ display: 'flex', zIndex: 10 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 24px',
            borderRadius: '99px',
            backgroundColor: 'rgba(59, 130, 246, 0.12)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
          }}>
            <span style={{ fontSize: '18px', color: '#93c5fd', fontWeight: 700 }}>
              docs.diamondhost.tw
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
