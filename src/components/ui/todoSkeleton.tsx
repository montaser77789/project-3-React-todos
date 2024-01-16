export const TodoSkeleton = () => {
  return (
    <>
    <div className="flex items-center justify-between">
      <div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="flex items-center justify-between space-x-3">
        <div className="h-9 w-20 bg-gray-300 rounded-md  dark:bg-gray-700 "></div>
        <div className="h-9 w-20 bg-gray-300 rounded-md  dark:bg-gray-700 "></div>
      </div>
    </div>
    </>
  );
};
 
