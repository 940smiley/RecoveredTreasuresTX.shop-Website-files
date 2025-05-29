export default function Loading() {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="space-y-8 w-full max-w-xl mx-auto text-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-32 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  )
}
