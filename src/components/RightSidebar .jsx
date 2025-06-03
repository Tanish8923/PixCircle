import React, { useState } from 'react';

const RightSidebar = ({ users }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleUsers = showAll ? users : users?.slice(0, 2);

  return (
    <div className="hidden lg:block w-96 p-12 border-l-2 border-gray-500 text-black">

      {/* Suggested users header */}
      <div className="flex justify-between mb-9">
        <p className="text-sm text-gray-500">Suggested for you</p>
      </div>

      {/* Suggested users list */}
      <div className="flex flex-col gap-4">
        {visibleUsers?.map((user) => (
          <div key={user.id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={user.profilePictureUrl}
                className="w-9 h-9 rounded-full"
                alt={user.username}
              />
              <div>
                <p className="text-sm font-semibold">{user.username}</p>
                <p className="text-xs text-gray-500">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
            <button className="text-blue-500 text-sm font-semibold">Follow</button>
          </div>
        ))}

        {users?.length > 2 && (
          <button
            className="text-sm text-black font-semibold mx-auto cursor-pointer mt-4 self-start"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'See All'}
          </button>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;




// import React from 'react';

// const RightSidebar = ({ users }) => {
//   console.log("RightSidebar users", users);

//   return (
//     <div className="hidden lg:block w-96 p-12 border-l-2 border-gray-500 text-black">

//       {/* Suggested users */}
//       <div className="flex justify-between mb-9">
//         <p className="text-sm text-gray-500">Suggested for you</p>
//         <button className="text-sm text-black font-semibold">See All</button>
//       </div>

//       <div className="flex flex-col gap-4">
//         {users?.map((user) => (
//           <div key={user.id} className="flex justify-between items-center">
//             <div className="flex items-center gap-3">
//               {/* If your API doesn't have image, use a placeholder */}
//               <img
//                 src={`https://i.pravatar.cc/150?u=${user.username}`}
//                 className="w-9 h-9 rounded-full"
//                 alt={user.username}
//               />
//               <div>
//                 <p className="text-sm font-semibold">{user.username}</p>
//                 <p className="text-xs text-gray-500">{user.firstName} {user.lastName}</p>
//               </div>
//             </div>
//             <button className="text-blue-500 text-sm font-semibold">Follow</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RightSidebar;
