import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RightSidebarSkeleton = () => (
  <div className="hidden lg:block w-96 p-12 border-l border-gray-500 text-black">
    <div className="flex justify-between mb-9">
      <p className="text-sm text-gray-500">Suggested for you</p>
    </div>

    <div className="flex flex-col gap-4">
      {[1, 2].map((_, index) => (
        <div key={index} className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Skeleton circle width={36} height={36} />
            <div>
              <Skeleton width={80} height={14} />
              <Skeleton width={100} height={12} />
            </div>
          </div>
          <Skeleton width={50} height={20} />
        </div>
      ))}

      <div className="flex justify-center mt-4">
        <Skeleton width={60} height={16} className="mt-4" />
      </div>
    </div>
  </div>
);

export default RightSidebarSkeleton;

