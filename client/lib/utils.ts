import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(createdAt: string) {
  const now = new Date(); // Current date and time
  const postDate = new Date(createdAt); // Convert createdAt to a Date object
  const diffInMs = now.getTime() - postDate.getTime(); // Difference in milliseconds

  const diffInSeconds = Math.floor(diffInMs / 1000); // Difference in seconds
  const diffInMinutes = Math.floor(diffInSeconds / 60); // Difference in minutes
  const diffInHours = Math.floor(diffInMinutes / 60); // Difference in hours
  const diffInDays = Math.floor(diffInHours / 24); // Difference in days

  // Handle formatting based on the time difference
  if (diffInSeconds < 60) {
    return `Just now`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes === 1 ? "" : "s"} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  } else {
    // Format as a standard date for older posts (e.g., "Jan 25, 2025")
    return postDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
}
export function isDeadlineSoon(deadline: string) {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7 && diffDays > 0;
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const calculateAge = (dateOfBirth: string) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};
