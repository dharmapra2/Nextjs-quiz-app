export default function SkeletonNormalLoader({ count = 1 }) {
  const arr = Array(count).fill(0);
  return (
    <>
      {arr.map((item, index) => (
        <div key={index} className="mt-2 mb-2">
          <div className="w-full h-5 bg-quiz-dark-grey-15 mt-3 animate-pulse rounded-md"></div>
          <div className="w-1/2 h-4 bg-quiz-dark-grey-15 mt-3 animate-pulse rounded-md"></div>
          <div className="w-3/4 h-4 bg-quiz-dark-grey-15 mt-3 animate-pulse rounded-md"></div>
          <div className="w-1/3 h-4 bg-quiz-dark-grey-15 mt-3 animate-pulse rounded-md"></div>
        </div>
      ))}
    </>
  );
}
