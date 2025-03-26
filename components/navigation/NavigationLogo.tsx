import Image from "next/image";

/**
 * The NavigationLogo component displays the application's logo.
 *
 * @returns A JSX element containing the logo single-image-upload.
 */
export const NavigationLogo = () => {
  return (
    <div className="flex shrink-0 items-center">
      {/* Use Next.js Image component for optimized single-image-upload loading */}
      <Image
        className="h-8 w-auto"
        src="/logo.svg"
        alt="Empower Tech CMS"
        width={32}
        height={32}
        style={{ width: "auto", height: "auto" }}
      />
    </div>
  );
};
