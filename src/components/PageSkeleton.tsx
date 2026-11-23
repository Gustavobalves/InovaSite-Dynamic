export function PageSkeleton() {
  return (
    <div
      className="mx-auto max-w-6xl px-6 py-16 md:py-24 animate-pulse"
      role="status"
      aria-label="Carregando conteúdo da página"
    >
      <div className="h-4 w-36 rounded bg-slate-200" />
      <div className="mt-5 h-12 max-w-xl rounded bg-slate-200" />
      <div className="mt-4 h-5 max-w-2xl rounded bg-slate-200/80" />
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="h-52 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="h-4 w-16 rounded bg-slate-200" />
          <div className="mt-4 h-6 w-40 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-full rounded bg-slate-100" />
          <div className="mt-2 h-4 w-4/5 rounded bg-slate-100" />
        </div>
        <div className="h-52 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="h-4 w-16 rounded bg-slate-200" />
          <div className="mt-4 h-6 w-40 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-full rounded bg-slate-100" />
          <div className="mt-2 h-4 w-4/5 rounded bg-slate-100" />
        </div>
        <div className="h-52 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="h-4 w-16 rounded bg-slate-200" />
          <div className="mt-4 h-6 w-40 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-full rounded bg-slate-100" />
          <div className="mt-2 h-4 w-4/5 rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
