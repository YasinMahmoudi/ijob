import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { HiOutlineBookmark, HiBookmark } from 'react-icons/hi2';
import { IoLocationOutline, IoBriefcaseOutline } from 'react-icons/io5';
import { CiDollar } from 'react-icons/ci';

function formateDate(date) {
  const publishedTime = new Date(date).getTime();
  const now = Date.now();

  const passedTime = Math.floor((now - publishedTime) / (60 * 60 * 1000));

  if (passedTime < 24) return `${passedTime} hours `;
  if (passedTime >= 24) return `${Math.floor(passedTime / 24)} days`;
}

export default function Card({ job, onAddBookmark, isBookmarked }) {
  const {
    id,
    jobTitle,
    companyName,
    companyLogo,
    jobGeo,
    jobType,
    salaryCurrency,
    annualSalaryMin,
    annualSalaryMax,
    pubDate,
    jobLevel,
  } = job;

  const minSalary = `${annualSalaryMin} ${salaryCurrency}`;
  const maxSalary = `${annualSalaryMax} ${salaryCurrency}`;

  return (
    <div className="card">
      <div className="card-header">
        <figure>
          <img src={companyLogo} alt={`Logo of ${jobTitle.toUpperCase()}`} />
        </figure>

        <div
          className="margin-left-10"
          style={{ display: 'grid', gap: '.5rem' }}>
          <div className="job-title">
            <h3> {jobTitle} </h3>
            <span className="badge"> {jobType?.at(0)} </span>
          </div>

          <p className="company">
            <span> {companyName} </span>
            <RiVerifiedBadgeFill />
          </p>
        </div>

        <span
          className="bookmark"
          role="button"
          onClick={() => onAddBookmark(id)}>
          {isBookmarked ? <HiBookmark /> : <HiOutlineBookmark />}
        </span>
      </div>

      <div className="card-body">
        <p>
          <span>
            <IoLocationOutline />
          </span>
          <span>{jobGeo}</span>
        </p>

        <div style={{ display: 'flex', gap: '3rem' }}>
          <p>
            <IoBriefcaseOutline />
            <span> {jobLevel} </span>
          </p>

          <p>
            <CiDollar />
            <span>
              {!annualSalaryMin && 'After interview'}
              {annualSalaryMin && `${minSalary} - ${maxSalary}`}
            </span>
          </p>
        </div>
      </div>

      <div className="card-footer">
        <div className="progress"></div>

        <div className="status">
          <p>
            <span> 6 </span>
            of
            <span> 15 </span>
            filled
          </p>

          <p>Added {formateDate(pubDate)} age</p>
        </div>
      </div>
    </div>
  );
}
