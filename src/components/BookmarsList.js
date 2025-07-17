import { TiTimes } from 'react-icons/ti';
import Button from './Button';

export default function SummaryList({ bookmarks, onDelete }) {
  return (
    <ul className="bookmarks-list scrollbar">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

function BookmarkItem({ bookmark, onDelete }) {
  return (
    <li>
      <figure>
        <img
          src={bookmark.companyLogo}
          alt={`Logo of ${bookmark.companyName}`}
        />
      </figure>

      <div>
        <h3> {bookmark.jobTitle} </h3>
        <span> {bookmark.companyName} </span>
      </div>

      <Button className="modal-close" onClick={() => onDelete(bookmark.id)}>
        <TiTimes />
      </Button>
    </li>
  );
}
