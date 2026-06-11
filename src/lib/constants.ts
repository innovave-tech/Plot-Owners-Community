export const ASSOCIATION = {
  name: 'Jagannathapuram Plot Owners Welfare Association',
  shortName: 'JPOWA',
  regNumber: '614/2015',
  address: '5-5-858, Chintalkunta Old Check Post, Jahangir Nagar, L. B. Nagar, Hyderabad',
  phone: '9876543210',
  email: 'info@jpowa.org',
  totalMembers: 120,
  totalPlots: 320,
  established: '2015',
} as const;

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Facilities', path: '/facilities' },
  { label: 'Committee', path: '/committee' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
] as const;

export const POSITIONS = [
  'President',
  'Secretary',
  'Treasurer',
  'PRO',
  'Executive Committee Member',
] as const;
