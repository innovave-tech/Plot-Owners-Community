export const ASSOCIATION = {
  name: 'JAGANNATHAPURAM PLOT OWNERS\' WELFARE ASSOCIATION',
  shortName: 'JPOWA',
  regNumber: '614/2015',
  address: '5-5-858,\nChintalkunta Old Check Post,\nJahangir Nagar,\nL.B. Nagar,\nHyderabad, Telangana',
  phone: '9876543210',
  email: 'info@jpowa.org',
  totalMembers: 120,
  totalPlots: 320,
  established: '2015',
} as const;

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Facilities', path: '/facilities' },
  { label: 'Committee', path: '/committee' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Layouts', path: '/layouts' },
  { label: 'Meetings & Finances', path: '/meetings' },
  { label: 'Membership', path: '/membership' },
] as const;

export const POSITIONS = [
  'President',
  'Secretary',
  'Treasurer',
  'PRO',
  'Executive Committee Member',
] as const;
