import { useEffect, useRef, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, ExternalLink, Info, Sparkles, X } from 'lucide-react';
import type { AppItem } from '../data/apps';

interface DetailPanelProps {
  app: AppItem;
  onClose: () => void;
}

type AppItemWithImagePreferences = AppItem & {
  imageFit?: CSSProperties['objectFit'];
  imagePosition?: CSSProperties['objectPosition'];
};

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function DetailPanel({ app, onClose }: DetailPanelProps) {
  const { Icon } = app;
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const imagePreferences = app as AppItemWithImagePreferences;
  const isGitHub = app.url.toLowerCase().includes('github.com');
  const categoryLabel = app.category === 'cvat' ? 'Công cụ CVAT' : 'Tiện ích cá nhân';

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      const currentPadding = Number.parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }

    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusableElements = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute('hidden') && element.getAttribute('aria-hidden') !== 'true');

      if (focusableElements.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (!panel.contains(activeElement)) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus();
      } else if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;

      if (previouslyFocused?.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, []);

  const panel = (
    <div className="fixed inset-0 z-50 flex items-end md:items-stretch md:justify-end">
      <button
        type="button"
        aria-label="Đóng bảng chi tiết ứng dụng"
        className="absolute inset-0 cursor-default bg-[#03050a]/80 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-400"
        onClick={onClose}
      />

      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="app-detail-title"
        aria-describedby="app-detail-description"
        tabIndex={-1}
        className="animate-slide-in relative z-10 flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-[2rem] border border-b-0 border-white/10 bg-[#080b12] shadow-[0_-24px_80px_rgba(0,0,0,0.55)] outline-none motion-reduce:animate-none md:h-full md:max-w-[40rem] md:rounded-none md:border-y-0 md:border-r-0 md:border-l md:shadow-[-32px_0_100px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-violet-400/80 to-teal-300/70 md:bg-gradient-to-b" />
        <div className="absolute left-1/2 top-2.5 z-20 h-1 w-10 -translate-x-1/2 rounded-full bg-white/25 md:hidden" />

        <div className="relative h-56 shrink-0 overflow-hidden bg-[#05070c] sm:h-72 md:h-80">
          <img
            src={app.screenshot}
            alt={`Ảnh minh họa của ${app.title}`}
            className="h-full w-full"
            style={{
              objectFit: imagePreferences.imageFit ?? 'cover',
              objectPosition: imagePreferences.imagePosition ?? 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-[#080b12]/12 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080b12] to-transparent" />
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Đóng chi tiết ứng dụng"
          className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-[#080b12]/75 text-slate-200 shadow-lg backdrop-blur-xl transition-colors hover:border-violet-300/40 hover:bg-violet-400/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b12]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-8 pt-6 sm:px-7">
          <header className="relative mb-7">
            <div className="mb-4 flex items-end gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-500/25 to-teal-400/15 text-violet-100 shadow-[0_12px_32px_rgba(124,58,237,0.18)] backdrop-blur-xl">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0 pb-0.5">
                <p className="mb-1 text-[11px] font-semibold uppercase text-teal-300/80">
                  {categoryLabel}
                </p>
                <h2 id="app-detail-title" className="text-2xl font-bold text-white">
                  {app.title}
                </h2>
              </div>
            </div>

            <p id="app-detail-description" className="text-[15px] leading-7 text-slate-300">
              {app.description}
            </p>
          </header>

          <dl className="mb-7 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
              <dt className="text-[11px] font-bold uppercase text-slate-500">Nền tảng</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-200">{app.platform}</dd>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
              <dt className="text-[11px] font-bold uppercase text-slate-500">Danh mục</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-200">{categoryLabel}</dd>
            </div>
          </dl>

          <ul className="mb-8 flex flex-wrap gap-2" aria-label="Nhãn ứng dụng">
            {app.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-slate-300"
              >
                {tag}
              </li>
            ))}
          </ul>

          <section className="mb-9" aria-labelledby="highlights-title">
            <h3 id="highlights-title" className="mb-4 flex items-center gap-2.5 text-sm font-bold text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-teal-300/15 bg-teal-400/10 text-teal-300">
                <Info className="h-4 w-4" aria-hidden="true" />
              </span>
              Điểm chính
            </h3>

            <ul className="space-y-3">
              {app.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 text-sm leading-6 text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="usage-guide-title">
            <h3 id="usage-guide-title" className="mb-5 flex items-center gap-2.5 text-sm font-bold text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-400/10 text-violet-300">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              Hướng dẫn sử dụng
            </h3>

            <ol className="space-y-4">
              {app.guide.map((step, index) => (
                <li key={step} className="group flex gap-4 text-sm leading-6 text-slate-300">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-teal-300/20 bg-teal-300/[0.08] text-xs font-bold text-teal-300 transition-colors group-hover:border-violet-300/30 group-hover:bg-violet-400/10 group-hover:text-violet-200">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <footer className="shrink-0 border-t border-white/10 bg-[#080b12]/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:px-7 sm:py-5">
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-violet-500 to-teal-500 px-5 py-3 text-sm font-bold text-white shadow-[0_14px_36px_rgba(124,58,237,0.25)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b12] active:scale-[0.99] motion-reduce:transition-none"
          >
            {isGitHub ? 'Xem dự án trên GitHub' : 'Mở ứng dụng'}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </footer>
      </section>
    </div>
  );

  return createPortal(panel, document.body);
}
