import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatTimeAgo(dateString: string): string {
  const currentDate: Date = new Date();
  const targetDate: Date = new Date(dateString);

  const timeDifference: number = currentDate.getTime() - targetDate.getTime();
  const seconds: number = Math.floor(timeDifference / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);

  if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
      return "Just now";
  }
}

const dateString: string = "2024-01-20T18:19:28.875+00:00";
const formattedTime: string = formatTimeAgo(dateString);
console.log(formattedTime);
