import 'server-only'

const TwoColumnLayout = ({
  leftColumn,
  rightColumn,
}: {
  leftColumn: React.ReactNode,
  rightColumn: React.ReactNode,
}) => {
  return (
    <div className="relative flex flex-col py-6 px-4 sm:px-6 lg:px-8 flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
      <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8 py-2">
        {/* Left column */}
        <div className="grid grid-cols-1 gap-4">
          <section className="overflow-hidden">
            {leftColumn}
          </section>
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <section className="overflow-hidden">
            {rightColumn}
          </section>
        </div>
      </div>
    </div>
  )
}

export default TwoColumnLayout