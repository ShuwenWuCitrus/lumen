const months = {
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

export function formatDate(
  date: string | Date,
  language: string = "zh"
): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  if (language === "zh") {
    return `${year}年${month}月${day}日`;
  } else {
    return `${months.en[month - 1]} ${day}, ${year}`;
  }
}
