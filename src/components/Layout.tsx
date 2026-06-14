import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { S } from "../content/strings";
import { Disclaimer } from "./Disclaimer";
import { CheckCircle } from "./Icons";

// App shell: minimal wordmark header, content, persistent sticky disclaimer,
// and a footer with legal links. The home action area stays nav-free (spec §4.3);
// the footer below is where legal/about links live.
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-base text-ink">
      <header className="border-b border-hairline">
        <div className="mx-auto flex max-w-prose items-center gap-2 px-4 py-3">
          <Link to="/" className="flex items-center gap-2" aria-label={`${S.brand} home`}>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-verdict-okBg">
              <CheckCircle size={18} className="text-teal" />
            </span>
            <span className="text-h2 font-bold text-ink">{S.brand}</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-prose flex-1 px-4 py-5">{children}</main>

      <Footer />
      <Disclaimer variant="sticky" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-hairline px-4 py-6 text-caption text-muted">
      <nav className="mx-auto flex max-w-prose flex-wrap gap-x-4 gap-y-2" aria-label="Footer">
        <Link to="/about" className="text-trust">
          About
        </Link>
        <Link to="/how-it-works" className="text-trust">
          How it works
        </Link>
        <Link to="/why-not-safe" className="text-trust">
          Why we can't say "safe"
        </Link>
        <Link to="/disclaimer" className="text-trust">
          Medical disclaimer
        </Link>
        <Link to="/privacy" className="text-trust">
          Privacy
        </Link>
        <Link to="/terms" className="text-trust">
          Terms
        </Link>
        <Link to="/accessibility" className="text-trust">
          Accessibility
        </Link>
      </nav>
      <p className="mx-auto mt-4 max-w-prose">{S.freshness}</p>
    </footer>
  );
}
