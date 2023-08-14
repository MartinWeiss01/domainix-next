'use client'

import { Locale } from "@/i18n-config";
import { usePathname } from "next/navigation";

export function getLocalizedURL(newPath: string): string {
  const currentPath = usePathname();
  const language = currentPath.split('/')[1];

  if (newPath.startsWith('/')) {
    // Absolute path
    return `/${language}${newPath}`;
  } else {
    // Relative path
    const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
    return `${currentDir}/${newPath}`;
  }
}

export function getPathnameWithoutLanguage(pathname: string): string {
  const parts = pathname.split('/');
  parts.splice(0, 2);
  return '/' + parts.join('/');
}

export function changeURLLanguage(lang: Locale): string {
  const currentPath = usePathname();
  const parts = currentPath.split('/');
  parts[1] = lang;
  return parts.join('/');
}