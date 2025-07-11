import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FeedSkeleton = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar skeleton */}
      <div className="hidden md:block w-64 p-4">
        <Skeleton height={40} count={6} style={{ marginBottom: "1rem" }} />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* PostBox Skeleton */}
        <div className="mb-6">
          <Skeleton height={50} borderRadius={10} />
        </div>

        {/* Feed Posts Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-4 border rounded-md bg-white shadow">
              <Skeleton height={20} width="40%" />
              <Skeleton height={15} count={3} style={{ marginTop: "0.5rem" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-72 p-4">
        <Skeleton height={30} width="60%" />
        <div className="mt-4 space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} height={40} borderRadius={10} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedSkeleton;
