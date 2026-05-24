import { useEffect, useState } from "react";

const formatRelativeTime = (dateString: string): string => {
  if (!dateString) return "";

  // Convert space to 'T' for clean ISO format parsing
  let formattedString = dateString.replace(" ", "T");

  // Only skip appending 'Z' if it ends with 'Z' or a valid timezone offset (e.g., +07:00 or -05:00)
  const hasTimezoneOffset = /[+-]\d{2}:\d{2}$/.test(formattedString);

  if (!formattedString.endsWith("Z") && !hasTimezoneOffset) {
    formattedString += "Z";
  }

  const date = new Date(formattedString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (Number.isNaN(diffInSeconds) || diffInSeconds < 0) {
    return "just now";
  }

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const intervals = [
    { unit: "year" as const, seconds: 31536000 },
    { unit: "month" as const, seconds: 2592000 },
    { unit: "week" as const, seconds: 604800 },
    { unit: "day" as const, seconds: 86400 },
    { unit: "hour" as const, seconds: 3600 },
    { unit: "minute" as const, seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return rtf.format(-count, interval.unit);
    }
  }

  return "just now";
};

type TimeAgoProps = {
  dateString: string;
};

export const TimeAgo = ({ dateString }: TimeAgoProps) => {
  const [displayTime, setDisplayTime] = useState("");

  useEffect(() => {
    setDisplayTime(formatRelativeTime(dateString));

    const interval = setInterval(() => {
      setDisplayTime(formatRelativeTime(dateString));
    }, 60000);

    return () => clearInterval(interval);
  }, [dateString]);

  return <>{displayTime || "..."}</>;
};

export default TimeAgo;
