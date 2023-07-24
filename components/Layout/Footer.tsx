import 'server-only'
import Link from "next/link"
import { ITranslationsFooter } from '@/types/translations'

export default function Footer({
  translations
}: {
  translations: ITranslationsFooter
}) {
  return (
    <footer>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left flex flex-col sm:flex-row justify-between flex-wrap">
          <Link href="https://martinweiss.cz/" target="_blank">
            <span>
              &copy; {new Date().getFullYear()} Martin Weiss
            </span>
          </Link>
          <Link href="https://martinweiss.cz/" target="_blank">
            <span>{translations.madeWithLove}</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}