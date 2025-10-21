import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col gap-16 overflow-hidden bg-gradient-to-br from-[#e9f2ff] via-[#f3f7ff] to-white px-6 py-16 dark:from-[#010617] dark:via-[#021433] dark:to-[#010617] sm:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.22),_transparent_60%)]"
      />
      <section className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="rounded-full border border-[#2563eb]/25 px-4 py-1 text-sm text-[#1f3b6e] dark:border-blue-400/40 dark:text-[#c7d7ff]">
          Minecraft 伺服器託管新選擇
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#0f172a] dark:text-[#e5ecff] sm:text-5xl">
          鑽石託管 DiamondHost
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[#274884] dark:text-[#a8b9ff]">
          專為 Minecraft 社群打造的全方位託管平台，提供穩定低延遲、即時擴充與專業技術支援，讓你把時間花在經營伺服器，而不是維護硬體。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/docs"
            className="rounded-md bg-[#1d4ed8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2563eb] dark:text-[#e5ecff]"
          >
            瀏覽使用指南
          </Link>
          <Link
            href="mailto:service@diamondhost.tw"
            className="rounded-md border border-[#2563eb]/40 px-6 py-3 text-sm font-semibold text-[#1f3b6e] transition hover:bg-[#dae6ff] dark:border-[#3b82f6]/60 dark:text-[#c7d7ff] dark:hover:bg-[#0b1a3a]"
          >
            聯絡專屬客服
          </Link>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid w-full max-w-5xl gap-6 rounded-2xl border border-[#2563eb]/15 bg-white/70 p-8 backdrop-blur dark:border-[#1d4ed8]/20 dark:bg-[#020d24]/80 sm:grid-cols-3">
        <article className="rounded-xl bg-[#f5f8ff]/80 p-6 text-left shadow-sm dark:bg-[#04122e]/80">
          <h2 className="text-lg font-semibold text-[#153463] dark:text-[#e5ecff]">低延遲架構</h2>
          <p className="mt-3 text-sm text-[#2d4c88] dark:text-[#9eb0ff]">
            多國資料中心與 Anycast 網路路由，確保全球玩家都能享有小於 30ms 的連線延遲，遊戲體驗絲滑順暢。
          </p>
        </article>
        <article className="rounded-xl bg-[#f5f8ff]/80 p-6 text-left shadow-sm dark:bg-[#04122e]/80">
          <h2 className="text-lg font-semibold text-[#153463] dark:text-[#e5ecff]">彈性計費</h2>
          <p className="mt-3 text-sm text-[#2d4c88] dark:text-[#9eb0ff]">
            依核心數與記憶體動態調整，無需長期綁約，隨開即用，月付、季付與年付方案皆有專屬折扣。
          </p>
        </article>
        <article className="rounded-xl bg-[#f5f8ff]/80 p-6 text-left shadow-sm dark:bg-[#04122e]/80">
          <h2 className="text-lg font-semibold text-[#153463] dark:text-[#e5ecff]">專業支援</h2>
          <p className="mt-3 text-sm text-[#2d4c88] dark:text-[#9eb0ff]">
            24/7 中文技術團隊待命，協助安裝模組、備份世界檔與調校效能，提供 Discord 線上緊急通報。
          </p>
        </article>
      </section>

      <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 rounded-2xl bg-gradient-to-r from-[#e4efff] via-[#ecf4ff] to-[#e4efff] p-10 text-center shadow-lg dark:from-[#031438] dark:via-[#052158] dark:to-[#031438]">
        <h2 className="text-2xl font-semibold text-[#0f172a] dark:text-[#e5ecff]">立即開啟你的伺服器旅程</h2>
        <p className="text-sm text-[#274884] dark:text-[#9eb0ff]">
          透過直覺控制台、一鍵備份與自動更新功能，只需幾分鐘就能把伺服器交給玩伴。想深入了解？前往文件中心探索完整教學與最佳實務。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/docs"
            className="rounded-md bg-[#1d4ed8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2563eb] dark:text-[#e5ecff]"
          >
            快速入門指南
          </Link>
          <Link
            href="https://store.diamondhost.tw"
            className="rounded-md border border-[#2563eb]/40 px-5 py-3 text-sm font-semibold text-[#1f3b6e] transition hover:bg-[#dae6ff] dark:border-[#3b82f6]/60 dark:text-[#c7d7ff] dark:hover:bg-[#0b1a3a]"
          >
            瞭解方案細節
          </Link>
        </div>
      </section>
    </main>
  );
}
