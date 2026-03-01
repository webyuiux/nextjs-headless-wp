// app/loading.tsx

import Skeleton from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div className="container">
      <Skeleton lines={8} showImage={true} />
    </div>
  )
}