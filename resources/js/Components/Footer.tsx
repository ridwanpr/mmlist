import { Link } from '@inertiajs/react';
import { about, privacyPolicy, terms } from '../actions/App/Http/Controllers/LegalController';
import { index as contactIndex } from '../actions/App/Http/Controllers/ContactController';

const Footer = () => {
  return (
    <footer className="bg-surface border-primary/10 mt-6 border-t pb-20 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              prefetch={'click'}
              className="text-primary text-xl font-bold tracking-tight"
            >
              Mamorulist
            </Link>
            <p className="text-primary-dark max-w-sm text-xs">
              Helping anime fans make informed content choices.
            </p>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap gap-x-8 gap-y-2">
            <ul className="flex gap-4">
              <li>
                <Link
                  href={about.url()}
                  prefetch={'click'}
                  className="text-primary-dark hover:text-primary text-sm transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={contactIndex.url()}
                  prefetch={'click'}
                  className="text-primary-dark hover:text-primary text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://status.mamorulist.com/"
                  target="__blank"
                  className="text-primary-dark hover:text-primary text-sm transition-colors"
                >
                  Status
                </a>
              </li>
            </ul>
            <ul className="border-border flex gap-4 lg:border-l-2 lg:pl-8">
              <li>
                <Link
                  href={terms.url()}
                  prefetch={'click'}
                  className="text-primary-dark hover:text-primary text-sm transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href={privacyPolicy.url()}
                  prefetch={'click'}
                  className="text-primary-dark hover:text-primary text-sm transition-colors"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>

          <p className="text-primary-dark text-xs opacity-70">&copy; Mamorulist</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
