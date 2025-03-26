import React from "react";
import { ModalProps } from "@/components/ui/modal/types";
import { CloseButton } from "@/components/ui/buttons/close-button/close-button";

/**
 * Modal component
 * Renders a customizable modal dialog
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  subtitle,
}: ModalProps) => {
  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      {/* Overlay to dim the background */}
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      />

      {/* Modal container */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {/* Modal content panel */}
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            {/* Close button (top-right corner on desktop) */}
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <CloseButton onClick={onClose} />
            </div>

            {/* Text content */}
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              {/* Modal title */}
              {title && (
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  {title}
                </h3>
              )}
              {/* Modal subtitle */}
              {subtitle && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 whitespace-normal break-words">
                    {subtitle}
                  </p>
                </div>
              )}
              {/* Modal content */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
