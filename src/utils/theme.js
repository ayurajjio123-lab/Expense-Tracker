export const LIGHT = {
  background: '#FFFFFF',
  surface: '#F5F8FC',
  card: '#FFFFFF',
  text: '#111820',
  muted: '#687684',
  border: '#DCE4EC',
  primary: '#147BEA',
  primarySoft: '#EAF3FF',
  success: '#16A56A',
  danger: '#E14B4B',
};

export const DARK = {
  background: '#111820',
  surface: '#151D27',
  card: '#171F29',
  text: '#F7FAFC',
  muted: '#A8B6C4',
  border: '#293745',
  primary: '#147BEA',
  primarySoft: '#143252',
  success: '#39C889',
  danger: '#FF7777',
};

export function getTheme(mode, systemDark) {
  return mode === 'dark' || (mode === 'system' && systemDark) ? DARK : LIGHT;
}
