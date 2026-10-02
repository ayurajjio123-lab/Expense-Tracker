export const pad = n => String(n).padStart(2, '0');
export const keyForDate = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
export const todayKey = () => keyForDate(new Date());
export const money = n => `₹${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
export const monthKey = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}`;
export const prettyDate = key => { const [y,m,d] = key.split('-'); return `${d}/${m}/${y}`; };

const validDate = (year, month, day) => {
  const d = new Date(year, month - 1, day);
  return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day ? d : null;
};

export const parseDateInput = input => {
  const s = String(input || '').trim();
  let m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (m) return validDate(Number(m[3]), Number(m[2]), Number(m[1]));
  m = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
  if (m) return validDate(Number(m[1]), Number(m[2]), Number(m[3]));
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
};
