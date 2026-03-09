import { RiBookReadFill, RiHomeHeartLine, RiToolsLine, RiUser3Fill } from "@remixicon/react";

export const NAV_LINKS = [
  {
    href: '/',
    label: 'Home',
    icon: RiHomeHeartLine,
    match: (pathname: string) => pathname === '/'
  },
  {
    href: '/blog',
    label: 'Blog',
    icon: RiBookReadFill,
    match: (pathname: string) =>
      pathname === '/blog' || pathname.startsWith('/blog/')
  },
  {
    href: '/projects',
    label: 'Projects',
    icon: RiToolsLine,
    match: (pathname: string) => pathname.startsWith('/projects')
  },
  {
    href: '/about',
    label: 'About',
    icon: RiUser3Fill,
    match: (pathname: string) => pathname === '/about'
  }
];