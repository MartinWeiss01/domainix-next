export default function Loading() {
  return (
    <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex h-96 flex items-center justify-center">
      <div className="inline-block relative w-20 h-20">
        <div className="absolute border-4 border-primary-500 opacity-0 rounded-full"></div>
        <div className="absolute border-4 border-primary-500 opacity-0 rounded-full animate-loading-animation" style={{ animationDelay: '-0.5s' }}></div>
      </div>
    </div>
  )
}