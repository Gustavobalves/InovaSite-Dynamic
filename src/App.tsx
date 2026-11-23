import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { Footer } from './components/Footer';
import { PageTransition } from './components/MotionPrimitives';
import { Navbar } from './components/Navbar';
import { PageSkeleton } from './components/PageSkeleton';
import { PAGE_METADATA } from './data/primeData';
import type {
  CondoProfileId,
  PageId,
  SavingsSimulationSummary,
} from './types/navigation';

// Dynamic code-splitting: each page tab loads on demand
const HomePage = lazy(() => import('./pages/HomePage'));
const QuemSomosPage = lazy(() => import('./pages/QuemSomosPage'));
const ServicosPage = lazy(() => import('./pages/ServicosPage'));
const InovacaoPage = lazy(() => import('./pages/InovacaoPage'));
const PublicoPage = lazy(() => import('./pages/PublicoPage'));
const EconomiaPage = lazy(() => import('./pages/EconomiaPage'));
const ContatoPage = lazy(() => import('./pages/ContatoPage'));

const VALID_PAGES = new Set<PageId>([
  'inicio',
  'quem-somos',
  'servicos',
  'inovacao',
  'publico',
  'economia',
  'contato',
]);

function resolvePageFromHash(): PageId {
  const cleaned = window.location.hash.replace(/^#\/?/, '').trim() as PageId;
  return VALID_PAGES.has(cleaned) ? cleaned : 'inicio';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(() => resolvePageFromHash());
  const [selectedCalcProfile, setSelectedCalcProfile] = useState<CondoProfileId>('residencial');
  const [simulationForContact, setSimulationForContact] =
    useState<SavingsSimulationSummary | null>(null);

  // Sync browser back/forward navigation with hash routes
  useEffect(() => {
    const onHashChange = () => {
      setActivePage(resolvePageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Dynamically update document title for each active page
  useEffect(() => {
    const meta = PAGE_METADATA[activePage];
    if (meta) {
      document.title = meta.title;
    }
  }, [activePage]);

  const handleNavigate = useCallback(
    (
      page: PageId,
      options?: { profileId?: CondoProfileId; simulation?: SavingsSimulationSummary }
    ) => {
      if (options?.profileId) {
        setSelectedCalcProfile(options.profileId);
      }
      if (options?.simulation) {
        setSimulationForContact(options.simulation);
      }

      setActivePage(page);
      const targetHash = PAGE_METADATA[page].hash;
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, '', targetHash);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const renderPage = () => {
    switch (activePage) {
      case 'inicio':
        return <HomePage onNavigate={handleNavigate} />;
      case 'quem-somos':
        return <QuemSomosPage onNavigate={handleNavigate} />;
      case 'servicos':
        return <ServicosPage onNavigate={handleNavigate} />;
      case 'inovacao':
        return <InovacaoPage onNavigate={handleNavigate} />;
      case 'publico':
        return <PublicoPage onNavigate={handleNavigate} />;
      case 'economia':
        return (
          <EconomiaPage
            onNavigate={handleNavigate}
            initialProfileId={selectedCalcProfile}
          />
        );
      case 'contato':
        return (
          <ContatoPage
            onNavigate={handleNavigate}
            simulation={simulationForContact}
            onClearSimulation={() => setSimulationForContact(null)}
          />
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-[#F8FAFC] text-[#0F172A]">
        <Navbar activePage={activePage} onNavigate={handleNavigate} />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <PageTransition pageKey={activePage}>
              <Suspense fallback={<PageSkeleton />}>{renderPage()}</Suspense>
            </PageTransition>
          </AnimatePresence>
        </main>

        <Footer onNavigate={handleNavigate} />
      </div>
    </MotionConfig>
  );
}
