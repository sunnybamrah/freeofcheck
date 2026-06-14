// M1 placeholder home page — confirms the dark theme + tokens render.
// Replaced by the real search experience in M5.
export function HomePage() {
  return (
    <main className="min-h-screen bg-base text-ink flex flex-col items-center justify-center px-5 text-center">
      <h1 className="text-h1 text-ink">FreeOfCheck</h1>
      <p className="mt-3 text-body text-muted max-w-prose">
        Know what&apos;s NOT in your medicine.
      </p>
      <p className="mt-6 text-caption text-muted">Scaffold online — building the checker.</p>
    </main>
  );
}
