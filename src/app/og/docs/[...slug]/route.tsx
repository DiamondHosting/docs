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

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#030712',
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(29, 78, 216, 0.2) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(5, 150, 200, 0.15) 0%, transparent 40%)',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div style={{
          position: 'absolute',
          top: '50px',
          right: '-50px',
          width: '400px',
          height: '400px',
          border: '1px solid rgba(59, 130, 246, 0.1)',
          transform: 'rotate(45deg)',
          zIndex: 0,
        }} />

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', zIndex: 10 }}>
          <img
            src="https://r2.diamondhost.tw/logo.png"
            width="80"
            height="80"
            style={{ borderRadius: '16px', marginRight: '24px', boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              鑽石託管 DiamondHost
            </div>
            <div style={{ fontSize: '20px', fontWeight: 500, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              官方文檔
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 10 }}>
          <h1 style={{
            fontSize: '80px',
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0,
            backgroundImage: 'linear-gradient(to bottom right, #ffffff, #94a3b8)',
            backgroundClip: 'text',
            color: 'transparent',
          }}>
            {page.data.title}
          </h1>
          <p style={{
            fontSize: '30px',
            color: '#cbd5e1',
            maxWidth: '960px',
            lineHeight: 1.4,
            margin: 0,
            fontWeight: 400,
          }}>
            {page.data.description}
          </p>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '60px',
          left: '80px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10
        }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />
          <span style={{ fontSize: '22px', color: '#64748b', fontWeight: 600 }}>docs.diamondhost.tw</span>
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
