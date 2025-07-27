export function formatDateTime(dateInput: string | Date): string {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) return 'Invalid Date';

  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;
  const hourString = hours.toString().padStart(2, '0');

  return `${day}-${month}-${year} ${hourString}:${minutes} ${ampm}`;
}