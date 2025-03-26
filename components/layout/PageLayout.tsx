import { PageLayoutProps } from "@/components/layout/types";

/**
 * A header component for pages that includes a header with a title and optional subtitle,
 * as well as a main section to display children content.
 *
 * @param props The properties required to render the page header.
 * @returns A JSX element containing the page header and main content.
 */
export const PageLayout = ({ children, title, subtitle }: PageLayoutProps) => {
  return (
    <>
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page title */}
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
          {/* Optional subtitle */}
          {subtitle && <p className="mt-2 text-sm text-gray-700">{subtitle}</p>}
        </div>
      </header>

      <main>
        {/* Container for the page's main content */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </>
  );
};
