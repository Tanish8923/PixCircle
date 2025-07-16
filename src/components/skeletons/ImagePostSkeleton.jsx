import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ImagePostSkeleton = () => {
  return (
    <div className="bg-white shadow p-4 rounded mb-6 max-w-md mx-auto">
      {/* Header Skeleton */}
      <div className="flex items-center gap-3 mb-2">
        <Skeleton circle height={40} width={40} />
        <div className="flex-1">
          <Skeleton width={100} height={16} />
        </div>
        <Skeleton width={70} height={24} />
      </div>

      {/* Image Skeleton */}
      <div className="w-full aspect-[5/5] overflow-hidden rounded">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Like Section Skeleton */}
      <div className="flex items-center gap-2 mt-3">
        <Skeleton circle height={20} width={20} />
        <Skeleton width={60} height={14} />
      </div>
    </div>
  );
};

export default ImagePostSkeleton;
