import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Box, Github, Search, Sparkles, X } from 'lucide-react';
import { AppCard } from './components/AppCard';
import { DetailPanel } from './components/DetailPanel';
import { apps, categories, type AppItem, type Category } from './data/apps';
import { cn } from './lib/cn';

const categoryHeadings: Record<Category, { title: string; description: string }> = {
  all: {
    title: 'Bộ công cụ',
    description: 'Tất cả tiện ích trong App Dock.',
  },
  cvat: {
    title: 'Công cụ CVAT',
    description: 'Kiểm tra, duyệt và xử lý dữ liệu gán nhãn.',
  },
  personal: {
    title: 'Tiện ích cá nhân',
    description: 'Những công cụ nhỏ cho công việc hằng ngày.',
  },
};

function normalizeSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('vi')
    .trim();
}

function App() {
  const [isReady, setIsReady] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable;

      if (event.key === '/' && !isTyping && !selectedApp) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }

      if (event.key === 'Escape' && document.activeElement === searchInputRef.current && search) {
        setSearch('');
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [search, selectedApp]);

  const filteredApps = useMemo(() => {
    const query = normalizeSearch(search);

    return apps.filter((app) => {
      if (activeCategory !== 'all' && app.category !== activeCategory) return false;
      if (!query) return true;

      return normalizeSearch(
        [app.title, app.description, app.platform, ...app.tags].join(' '),
      ).includes(query);
    });
  }, [activeCategory, search]);

  const closeDetails = useCallback(() => setSelectedApp(null), []);
  const resetFilters = useCallback(() => {
    setSearch('');
    setActiveCategory('all');
    window.requestAnimationFrame(() => searchInputRef.current?.focus());
  }, []);

  const currentHeading = categoryHeadings[activeCategory];
  const hasActiveFilter = activeCategory !== 'all' || search.trim().length > 0;
  const showFeaturedCard = activeCategory === 'all' && search.trim().length === 0;
  const cvatCount = apps.filter((app) => app.category === 'cvat').length;

  return (
    <div className="app-background min-h-dvh overflow-x-hidden bg-[#080b12] text-slate-100 selection:bg-violet-400/30 selection:text-white">
      <a
        href="#apps"
        className="pointer-events-none fixed left-4 top-3 z-[100] -translate-y-20 rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-950 opacity-0 transition-[transform,opacity] focus-visible:pointer-events-auto focus-visible:translate-y-0 focus-visible:opacity-100"
      >
        Bỏ qua phần giới thiệu
      </a>

      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#080b12]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#"
            className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080b12]"
            aria-label="App Dock — về đầu trang"
          >
            <span className="brand-mark flex size-10 items-center justify-center rounded-2xl border border-white/10 text-white shadow-[0_12px_30px_-12px_rgba(124,106,255,0.9)]">
              <Box className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-[15px] font-extrabold leading-none tracking-[-0.02em] text-white">
                App Dock
              </span>
              <span className="mt-1 block text-[11px] font-semibold text-slate-500">NDCLI toolstack</span>
            </span>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden text-xs font-semibold text-slate-500 sm:inline">
              {apps.length} công cụ đang hoạt động
            </span>
            <a
              href="https://github.com/NDCLI"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-3.5 text-sm font-bold text-slate-200 transition-colors hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              aria-label="Xem GitHub của NDCLI (mở trong tab mới)"
            >
              <Github className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">GitHub</span>
              <ArrowUpRight className="size-3.5 text-slate-500" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 lg:pt-16" aria-labelledby="hero-title">
          <div className="hero-panel relative isolate overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#0d121d] px-5 py-9 shadow-[0_32px_100px_-60px_rgba(70,55,255,0.8)] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="hero-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
            <div className="hero-glow pointer-events-none absolute -right-28 -top-28 -z-10 size-80 rounded-full blur-3xl" aria-hidden="true" />
            <div className="relative max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1.5 text-xs font-bold text-violet-200">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Công cụ gọn nhẹ cho workflow dữ liệu
              </div>

              <h1 id="hero-title" className="max-w-4xl text-balance text-4xl font-extrabold leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-[4rem]">
                Chọn đúng công cụ.
                <span className="text-gradient block">Bắt đầu công việc ngay.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-[15px] leading-7 text-slate-400 sm:text-lg sm:leading-8">
                Tập hợp các tiện ích CVAT, AI và công cụ cá nhân do AI xây dựng.
              </p>

              <dl className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
                <div className="flex items-baseline gap-2">
                  <dt className="sr-only">Tổng số công cụ</dt>
                  <dd className="font-bold text-white">{apps.length}</dd>
                  <span>công cụ</span>
                </div>
                <span className="hidden size-1 rounded-full bg-slate-700 sm:block" aria-hidden="true" />
                <div className="flex items-baseline gap-2">
                  <dt className="sr-only">Công cụ CVAT</dt>
                  <dd className="font-bold text-white">{cvatCount}</dd>
                  <span>cho CVAT</span>
                </div>
                <span className="hidden size-1 rounded-full bg-slate-700 sm:block" aria-hidden="true" />
                <div className="flex items-baseline gap-2">
                  <dt className="sr-only">Nền tảng</dt>
                  <dd>Web &amp; Windows</dd>
                </div>
              </dl>

              <div className="mt-9 max-w-3xl">
                <form role="search" onSubmit={(event) => event.preventDefault()}>
                  <label htmlFor="app-search" className="sr-only">
                    Tìm ứng dụng theo tên, chức năng hoặc công nghệ
                  </label>
                  <div className="search-shell relative flex items-center rounded-2xl border border-white/[0.12] bg-[#080b12]/80 p-1.5 shadow-[0_22px_60px_-36px_rgba(0,0,0,0.95)] focus-within:border-violet-300/50 focus-within:ring-4 focus-within:ring-violet-400/10">
                    <Search className="ml-3 size-5 shrink-0 text-slate-500" aria-hidden="true" />
                    <input
                      ref={searchInputRef}
                      id="app-search"
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Tìm theo tên, chức năng hoặc công nghệ..."
                      autoComplete="off"
                      className="min-h-12 min-w-0 flex-1 bg-transparent px-3 text-[15px] font-medium text-white outline-none placeholder:text-slate-500 sm:text-base [&::-webkit-search-cancel-button]:hidden"
                    />
                    {search ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSearch('');
                          searchInputRef.current?.focus();
                        }}
                        className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
                        aria-label="Xóa nội dung tìm kiếm"
                      >
                        <X className="size-4" aria-hidden="true" />
                      </button>
                    ) : (
                      <kbd className="mr-2 hidden rounded-lg border border-white/10 bg-white/[0.05] px-2 py-1 text-xs font-bold text-slate-500 sm:block">
                        /
                      </kbd>
                    )}
                  </div>
                </form>

                <nav className="scrollbar-hide mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Lọc ứng dụng theo danh mục">
                  {categories.map(({ key, label, shortLabel, Icon }) => {
                    const count = key === 'all' ? apps.length : apps.filter((app) => app.category === key).length;
                    const isActive = activeCategory === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveCategory(key)}
                        aria-pressed={isActive}
                        className={cn(
                          'inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border px-3.5 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300',
                          isActive
                            ? 'border-violet-300/30 bg-violet-400/15 text-violet-100'
                            : 'border-white/[0.08] bg-white/[0.035] text-slate-400 hover:border-white/[0.14] hover:bg-white/[0.065] hover:text-white',
                        )}
                        aria-label={`${label}, ${count} ứng dụng`}
                      >
                        <Icon className="size-4" aria-hidden="true" />
                        <span className="sm:hidden">{shortLabel}</span>
                        <span className="hidden sm:inline">{label}</span>
                        <span className={cn('rounded-md px-1.5 py-0.5 text-[11px]', isActive ? 'bg-violet-200/10 text-violet-100' : 'bg-white/[0.05] text-slate-500')}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </section>

        <section id="apps" tabIndex={-1} className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-20 outline-none sm:px-6 lg:px-8 lg:pb-28" aria-labelledby="apps-heading">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-300">Khám phá</p>
              <h2 id="apps-heading" className="text-2xl font-extrabold tracking-[-0.03em] text-white sm:text-3xl">
                {currentHeading.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{currentHeading.description}</p>
            </div>
            <p className="text-sm font-semibold text-slate-400" aria-live="polite" aria-atomic="true">
              {filteredApps.length} kết quả
              {search.trim() ? ` cho “${search.trim()}”` : ''}
            </p>
          </div>

          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
              {filteredApps.map((app, index) => (
                <AppCard
                  key={app.id}
                  app={app}
                  index={index}
                  isReady={isReady}
                  isFeatured={showFeaturedCard && index === 0}
                  onSelect={setSelectedApp}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-white/[0.12] bg-white/[0.025] px-6 text-center">
              <span className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] text-slate-400">
                <Search className="size-6" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold text-white">Chưa tìm thấy công cụ phù hợp</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                Hãy thử một từ khóa ngắn hơn hoặc quay lại danh sách đầy đủ.
              </p>
              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-bold text-slate-950 transition-colors hover:bg-violet-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080b12]"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="font-bold text-slate-300">App Dock</p>
            <p className="mt-1">Một nơi cho những công cụ NDCLI sử dụng mỗi ngày.</p>
          </div>
          <p>© 2026 NDCLI · React &amp; Tailwind CSS</p>
        </div>
      </footer>

      {selectedApp && <DetailPanel app={selectedApp} onClose={closeDetails} />}
    </div>
  );
}

export default App;
