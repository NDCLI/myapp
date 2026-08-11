import { ArrowUpRight, ChevronRight } from 'lucide-react';
import type { AppItem } from '../data/apps';
import { cn } from '../lib/cn';

interface AppCardProps {
  app: AppItem;
  index: number;
  isReady: boolean;
  isFeatured?: boolean;
  onSelect: (app: AppItem) => void;
}

export function AppCard({
  app,
  index,
  isReady,
  isFeatured = false,
  onSelect,
}: AppCardProps) {
  const { Icon } = app;
  const categoryLabel = app.category === 'cvat' ? 'Công cụ CVAT' : 'Tiện ích cá nhân';
  const externalLabel = app.url.toLowerCase().includes('github.com') ? 'Mở GitHub' : 'Mở ứng dụng';

  return (
    <article
      className={cn(
        'app-card group relative isolate flex min-h-full overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[#0e1320] shadow-[0_24px_80px_-52px_rgba(0,0,0,0.95)]',
        'motion-safe:transition-[transform,opacity,border-color,box-shadow] motion-safe:duration-500',
        'hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-[0_30px_90px_-48px_rgba(97,88,255,0.42)]',
        app.accent,
        isFeatured ? 'flex-col lg:col-span-2 lg:grid lg:grid-cols-[0.85fr_1.15fr]' : 'flex-col',
        isReady ? 'app-card-ready translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
      )}
      style={{ '--entrance-delay': `${Math.min(index, 5) * 70}ms` } as React.CSSProperties}
    >
      <button
        type="button"
        className="absolute inset-0 z-10 rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080b12]"
        onClick={() => onSelect(app)}
        aria-label={`Xem chi tiết ${app.title}`}
        aria-describedby={`app-description-${app.id}`}
      />

      <div
        className={cn(
          'relative overflow-hidden bg-[#080b12]',
          isFeatured ? 'min-h-64 lg:order-2 lg:min-h-full' : 'aspect-[16/10]',
        )}
      >
        <img
          src={app.screenshot}
          alt=""
          loading={isFeatured ? 'eager' : 'lazy'}
          className={cn(
            'h-full w-full motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out',
            isFeatured
              ? 'object-contain p-5 group-hover:scale-[1.01] sm:p-6'
              : app.imageFit === 'contain'
                ? 'object-contain p-5 group-hover:scale-[1.025]'
                : 'object-cover group-hover:scale-[1.025]',
          )}
          style={{ objectPosition: app.imagePosition ?? 'center' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e1320] via-transparent to-black/10 lg:bg-gradient-to-r lg:from-[#0e1320]/20 lg:to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          {isFeatured && (
            <span className="rounded-full border border-violet-300/25 bg-violet-400/15 px-3 py-1 text-xs font-bold text-violet-100 backdrop-blur-md">
              Nổi bật
            </span>
          )}
          <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-slate-200 backdrop-blur-md">
            {categoryLabel}
          </span>
        </div>
      </div>

      <div className={cn('relative flex flex-1 flex-col p-5 sm:p-6', isFeatured && 'lg:order-1 lg:p-8')}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={cn(
                'flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.055] text-slate-300',
                'motion-safe:transition-colors motion-safe:duration-300',
                app.accentBackground,
              )}
            >
              <Icon className="size-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h3 className={cn('truncate font-bold tracking-[-0.02em] text-white', isFeatured ? 'text-xl sm:text-2xl' : 'text-lg')}>
                {app.title}
              </h3>
              <p className="mt-0.5 text-xs font-semibold text-slate-500">{app.platform}</p>
            </div>
          </div>
          <ChevronRight
            className="mt-1 size-5 shrink-0 text-slate-600 motion-safe:transition-transform motion-safe:duration-300 group-hover:translate-x-1 group-hover:text-violet-300"
            aria-hidden="true"
          />
        </div>

        <p
          id={`app-description-${app.id}`}
          className={cn(
            'leading-7 text-slate-400',
            isFeatured ? 'max-w-xl text-[15px] sm:text-base' : 'line-clamp-3 text-sm',
          )}
        >
          {app.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {app.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="relative z-20 mt-auto flex items-center gap-3 pt-7">
          <button
            type="button"
            onClick={() => onSelect(app)}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white px-4 text-sm font-bold text-[#0a0d14] transition-colors hover:bg-violet-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1320]"
          >
            Xem chi tiết
          </button>
          <a
            href={app.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-4 text-sm font-bold text-slate-200 transition-colors hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
            aria-label={`${externalLabel}: ${app.title} (mở trong tab mới)`}
          >
            <span className="hidden sm:inline">{externalLabel}</span>
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
