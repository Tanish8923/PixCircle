import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen mt-16 md:mt-0 p-4 sm:p-6 text-black">
      <div className="flex flex-col items-center">
        {/* Profile Header Skeleton */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-0 w-full md:items-start items-center justify-evenly">
          {/* Profile Picture */}
          <Skeleton circle={true} height={160} width={160} />

          {/* Info Block */}
          <div className="flex flex-col gap-5 items-start">
            {/* Username and Button */}
            <div className="flex gap-12 mt-2 ">
              <Skeleton width={120} height={24} />
              <Skeleton width={100} height={32} />
            </div>

            {/* Followers/Following */}
            <div className="flex gap-6 mt-4 text-sm">
              <Skeleton width={60} height={18} />
              <Skeleton width={80} height={18} />
              <Skeleton width={80} height={18} />
            </div>

            {/* Name and Bio */}
            <Skeleton width={150} height={20} />
            <Skeleton count={2} height={14} width="80%" />
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 w-[90%] mt-12 my-4" />

        {/* Posts Tab */}
        <div className="flex justify-center gap-8 text-sm ">
          <p className="border-b-2 border-blue-500 pb-2">POSTS</p>
        </div>

        {/* Post Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-full max-w-5xl">
          {[...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              className="rounded-md"
              style={{ aspectRatio: '1 / 1' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
