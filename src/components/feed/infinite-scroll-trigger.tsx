"use client";

import { useEffect, useRef } from "react";

interface InfiniteScrollTriggerProps {
  onIntersect: () => void;
  isFetching: boolean;
  threshold?: number;
  rootMargin?: string;
}

const InfiniteScrollTrigger = ({
  onIntersect,
  isFetching,
  threshold = 0.1,
  rootMargin = "200px", // Trigger 200px before element is visible
}: InfiniteScrollTriggerProps) => {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentTrigger = triggerRef.current;

    if (!currentTrigger) return;

    // Create IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        // Trigger fetch only if:
        // 1. Element is intersecting
        // 2. Not currently fetching (prevent multiple triggers)
        if (entry.isIntersecting && !isFetching) {
          onIntersect();
        }
      },
      {
        threshold, // How much of element must be visible (0.0 to 1.0)
        rootMargin, // Trigger before element enters viewport
      }
    );

    // Start observing
    observer.observe(currentTrigger);

    // Cleanup function (prevent memory leak)
    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
      observer.disconnect();
    };
  }, [onIntersect, isFetching, threshold, rootMargin]);
  return (
    <div
      ref={triggerRef}
      className="h-20 flex items-center justify-center"
      aria-label="Loading trigger"
    >
      <div className="w-full max-w-md h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full bg-blue-600 transition-all duration-300 ${
            isFetching ? "w-full animate-pulse" : "w-0"
          }`}
        />
      </div>
    </div>
  );
};

export default InfiniteScrollTrigger;
