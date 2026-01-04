/**
 * Format timestamp menjadi relative time
 * Examples: "just now", "5m ago", "2h ago", "3d ago", "Jan 2"
 */

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Just now (< 1 minute)
  if (diffInSeconds < 60) {
    return "just now";
  }

  // Minutes ago (< 1 hour)
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  }

  // Hours ago (< 24 hours)
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  }

  // Days ago (< 7 days)
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/**
 * Format number dengan K/M suffix
 * Examples: 1234 → "1.2K", 1500000 → "1.5M"
 */

export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
}
