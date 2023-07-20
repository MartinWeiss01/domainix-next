import 'server-only'

const TwoColumnLayout = ({
  leftColumn,
  rightColumn,
}: {
  leftColumn: React.ReactNode,
  rightColumn: React.ReactNode,
}) => {
  return (
    <div className="relative min-h-screen flex flex-col py-6 px-4 sm:px-6 lg:px-8 flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
      <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
        {/* Left column */}
        <div className="grid grid-cols-1 gap-4">
          <section>
            <div className="rounded-lg bg-white overflow-hidden shadow">
              <div className="p-6">
                {leftColumn}
              </div>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <section>
            <div className="rounded-lg bg-white overflow-hidden shadow">
              <div className="p-6">
                {rightColumn}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TwoColumnLayout