import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RightSidebarSkeleton = () => (
  <div className="hidden lg:block w-72 p-4">
    <Skeleton height={30} width="60%" />
    <div className="mt-4 space-y-3">
      {[1, 2, 3, 4].map((item) => (
        <Skeleton key={item} height={40} borderRadius={10} />
      ))}
    </div>
  </div>
);

export default RightSidebarSkeleton;
