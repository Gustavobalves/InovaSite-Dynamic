import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PAGE_METADATA, PRIMARY_NAV_ITEMS } from '../data/primeData';
import type { PageId } from '../types/navigation';
import { BrandLogo } from './BrandLogo';
import { ARCHITECTURAL_EASE } from './MotionPrimitives';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (page: PageId) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-8 px-6">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('inicio')}
          className="inline-flex items-center rounded-md py-1 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1546C0] whitespace-nowrap shrink-0"
          aria-label="Prime Facilix — Ir para o início"
        >
          <BrandLogo compact />
        </button>

        {/* Zone 2: 5 concise single-line text nav links */}
        <nav
          aria-label="Navegação principal"
          className="hidden lg:flex items-center gap-7"
        >
          {PRIMARY_NAV_ITEMS.map((pageId) => {
            const meta = PAGE_METADATA[pageId];
            const isActive = activePage === pageId;
            return (
              <button
                key={pageId}
                type="button"
                onClick={() => handleSelect(pageId)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1546C0] ${
                  isActive
                    ? 'text-[#1546C0]'
                    : 'text-[#475569] hover:text-[#0A1628]'
                }`}
              >
                {meta.label}
                {isActive && (
                  <motion.span
                    layoutId="prime-nav-indicator"
                    transition={{ duration: 0.22, ease: ARCHITECTURAL_EASE }}
                    className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-[#1546C0]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('contato')}
            className={`hidden sm:inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1546C0] ${
              activePage === 'contato'
                ? 'bg-[#0A1628] text-white'
                : 'bg-[#1546C0] text-white hover:bg-[#1D4ED8]'
            }`}
          >
            Fale Conosco
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-[#0A1628] transition-colors hover:bg-slate-50 lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1546C0]"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: ARCHITECTURAL_EASE }}
            className="border-b border-slate-200 bg-white px-6 py-4 shadow-lg lg:hidden"
          >
            <nav aria-label="Navegação mobile" className="flex flex-col gap-1">
              {(['inicio', ...PRIMARY_NAV_ITEMS] as PageId[]).map((pageId) => {
                const meta = PAGE_METADATA[pageId];
                const isActive = activePage === pageId;
                return (
                  <button
                    key={pageId}
                    type="button"
                    onClick={() => handleSelect(pageId)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex min-h-[44px] w-full items-center justify-between rounded-lg px-3.5 text-left text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#EFF4FF] text-[#1546C0]'
                        : 'text-[#0F172A] hover:bg-slate-50'
                    }`}
                  >
                    <span>{meta.label}</span>
                    {isActive && (
                      <span className="text-xs font-medium text-[#1546C0]">Atual</span>
                    )}
                  </button>
                );
              })}
              <div className="mt-3 border-t border-slate-200 pt-3">
                <button
                  type="button"
                  onClick={() => handleSelect('contato')}
                  className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#1546C0] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8]"
                >
                  Fale Conosco
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
