import Card from './Card';
import Loader from './Loader';

export default function Main({
  jobs,
  bookmarks,
  isLoading,
  error,
  onAddBookmark,
}) {
  const bookmarkIds = bookmarks.map((bookmark) => bookmark.id);

  return (
    <main className="main">
      {isLoading && <Loader />}
      {!isLoading &&
        !error &&
        Array.isArray(jobs) &&
        jobs?.map((job) => (
          <Card
            key={job.id}
            job={job}
            onAddBookmark={onAddBookmark}
            isBookmarked={bookmarkIds.includes(job.id)}
          />
        ))}

      {error && <span> ⛔ {error} ⛔ </span>}
    </main>
  );
}
