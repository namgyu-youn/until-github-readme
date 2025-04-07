export function formatDate(date: Date) {
  // yyyy. MM. dd
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
