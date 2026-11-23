import { ArrowUpRight, FileText, Globe, Instagram, Mail, Phone } from 'lucide-react';
import {
  BRAND_CONTACT,
  PAGE_METADATA,
  PORTFOLIO_PDF_PATH,
  PRIMARY_NAV_ITEMS,
} from '../data/primeData';
import type { PageId } from '../types/navigation';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-slate-800 bg-[#0A1628] text-slate-300">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={() => onNavigate('inicio')}
              className="inline-flex items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <BrandLogo inverted />
            </button>
            <p className="mt-2 text-xs font-medium tracking-wide text-slate-400">
              Gestão de Condomínios
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-200">
              {BRAND_CONTACT.closingStatement}
            </p>
            <p className="mt-3 text-sm text-slate-400">
              {BRAND_CONTACT.closingMotto}
            </p>

            <div className="mt-6">
              <a
                href={PORTFOLIO_PDF_PATH}
                download="Portfolio-Prime-Facilix.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-slate-500 hover:bg-slate-800 whitespace-nowrap"
              >
                <FileText className="h-4 w-4 text-blue-300" />
                <span>Baixar Portfólio Institucional (PDF)</span>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Navigation Mirror */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-white">Páginas</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {(['inicio', ...PRIMARY_NAV_ITEMS, 'contato'] as PageId[]).map((id) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(id)}
                    className="text-slate-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {PAGE_METADATA[id].label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Contact Channels */}
          <div className="lg:col-span-4">
            <h2 className="text-sm font-semibold text-white">Entre em contato</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={BRAND_CONTACT.phoneHref}
                  className="inline-flex items-center gap-2.5 text-slate-300 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-blue-300" />
                  <span className="tabular-nums">{BRAND_CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND_CONTACT.email}`}
                  className="inline-flex items-center gap-2.5 text-slate-300 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-blue-300" />
                  <span>{BRAND_CONTACT.email}</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-slate-300">
                <Globe className="h-4 w-4 shrink-0 text-blue-300" />
                <span>{BRAND_CONTACT.website}</span>
              </li>
              <li className="inline-flex items-center gap-2.5 text-slate-300">
                <Instagram className="h-4 w-4 shrink-0 text-blue-300" />
                <span>{BRAND_CONTACT.instagram}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-slate-800/90 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Prime Facilix Gestão de Condomínios. Todos os direitos reservados.</p>
          <p>Transparência · Tecnologia · Valorização patrimonial</p>
        </div>
      </div>
    </footer>
  );
}
