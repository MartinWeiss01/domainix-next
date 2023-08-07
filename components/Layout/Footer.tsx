import 'server-only'
import Link from "next/link"
import { ITranslationsFooter } from '@/types/translations'

export default function Footer({ translations }: { translations: ITranslationsFooter }) {
  return (
    <footer className="flex flex-col justify-between flex-wrap max-w-3xl mx-auto px-4 py-8 text-sm text-center border-t border-gray-200 text-gray-500 sm:flex-row sm:px-6 lg:px-8 lg:max-w-7xl">
      <Link href="https://martinweiss.cz/" target="_blank">
        <span>&copy; {new Date().getFullYear()} Martin Weiss</span>
      </Link>

      <Link href="https://martinweiss.cz/" target="_blank">
        <span>{translations.madeWithLove}</span>
      </Link>
    </footer>
  )
}