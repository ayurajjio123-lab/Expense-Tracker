export function todayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function money(value) {
  return `₹${(Number(value) || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

export function prettyDate(key) {
  const [y, m, d] = String(key).split('-').map(Number);
  if (!y || !m || !d) return key;
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
}

export function monthKey(date = new Date()) {
  return todayKey(date).slice(0, 7);
}

export function monthLabel(key) {
  const [y, m] = String(key).split('-').map(Number);
  return new Date(y, (m || 1) - 1, 1).toLocaleDateString('en-IN', {
    month: 'long', year: 'numeric'
  });
}
