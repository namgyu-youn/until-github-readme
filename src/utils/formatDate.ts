export function formatDate(date: string) {
  const dateObj = new Date(date);

  // yyyy-MM-dd
  return dateObj.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
