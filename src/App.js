import Main from './components/Main';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import FilterBox from './components/FilterBox';
import Button from './components/Button';
import Input from './components/Input';
import Toggle from './components/Toggle';
import TitleHeading from './components/TitleHeading';
import FlexRow from './components/FlexRow';
import Accordian from './components/Accordian';
import CheckBoxList from './components/CheckBoxList';
import Logo from './components/Logo';
import CounterIcon from './components/CounterIcon';
import Modal from './components/Modal';
import BookmarsList from './components/BookmarsList';

import { BsBookmarks } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import useLocalStorageState from './hooks/useLocalStorageState';
import { useJobs } from './hooks/useJobs';
const categoriesObj = [
  {
    id: crypto.randomUUID(),
    value: 'business',
    title: 'Business Development',
  },

  {
    id: crypto.randomUUID(),
    value: 'copywriting',
    title: 'Copywriting & Content',
  },

  {
    id: crypto.randomUUID(),
    value: 'supporting',
    title: 'Customer Success',
  },

  {
    id: crypto.randomUUID(),
    value: 'Technical Support',
    title: 'technical-support',
  },

  {
    id: crypto.randomUUID(),
    value: 'data-science',
    title: 'Data Science',
  },

  {
    id: crypto.randomUUID(),
    value: 'design-multimedia',
    title: 'Design & Creative',
  },

  {
    id: crypto.randomUUID(),
    value: 'web-app-design',
    title: 'Web & App Design',
  },

  {
    id: crypto.randomUUID(),
    value: 'admin',
    title: 'DevOps & SysAdmin',
  },

  {
    id: crypto.randomUUID(),
    value: 'engineering',
    title: 'Engineering',
  },

  {
    id: crypto.randomUUID(),
    value: 'accounting-finance',
    title: 'Finance & Legal',
  },

  {
    id: crypto.randomUUID(),
    value: 'hr',
    title: 'HR & Recruiting',
  },

  {
    id: crypto.randomUUID(),
    value: 'marketing',
    title: 'Marketing & Sales',
  },

  {
    id: crypto.randomUUID(),
    value: 'seller',
    title: 'Sales',
  },

  {
    id: crypto.randomUUID(),
    value: 'seo',
    title: 'SEO',
  },

  {
    id: crypto.randomUUID(),
    value: 'smm',
    title: 'Social Media Marketing',
  },

  {
    id: crypto.randomUUID(),
    value: 'management',
    title: 'Product & Operations',
  },

  {
    id: crypto.randomUUID(),
    value: 'dev',
    title: 'Programming',
  },
];

const jobTypes = [
  {
    id: crypto.randomUUID(),
    value: 'full-time',
    title: 'full-time',
  },

  {
    id: crypto.randomUUID(),
    value: 'contract',
    title: 'contract',
  },

  {
    id: crypto.randomUUID(),
    value: 'internship',
    title: 'internship',
  },

  {
    id: crypto.randomUUID(),
    value: 'part-time',
    title: 'part-time',
  },
];

export default function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState(categoriesObj);
  const [bookmarks, setBookmarks] = useLocalStorageState([], 'bookmarks');

  const { jobs, setJobs, isLoading, setIsLoading, error, setError } =
    useJobs(query);

  useEffect(
    function () {
      async function fetchJobs() {
        try {
          setIsLoading(true);
          const res = await fetch('https://jobicy.com/api/v2/remote-jobs');

          const data = await res.json();

          setJobs(data.jobs);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchJobs();
    },
    [setError, setIsLoading, setJobs]
  );

  useEffect(
    function () {
      async function filterJobs() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://jobicy.com/api/v2/remote-jobs?industry=${category}`
          );

          if (!res.ok)
            throw new Error('Something happend with fetching jobs !');

          const data = await res.json();

          setJobs(data.jobs);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (!category) return;

      filterJobs();
    },

    [category, setError, setIsLoading, setJobs]
  );

  useEffect(
    function () {
      if (query.length < 2) return;

      document.title = `You search for : ${query}`;

      return () => (document.title = 'IJOB');
    },
    [query]
  );

  function handleSearchCategory(value) {
    setCategories((categories) =>
      value
        ? categories.filter((cat) =>
            cat.title.toLocaleLowerCase().trim().startsWith(value)
          )
        : categoriesObj
    );
  }

  function handleAddBookmark(id) {
    if (bookmarks.some((bookmark) => bookmark.id === id))
      return handleDeleteBookmark(id);

    const [matchedBookmark] = jobs.filter((job) => job.id === id);

    const { companyLogo, companyName, jobTitle, jobType } = matchedBookmark;

    const newBookmark = {
      id,
      companyLogo,
      companyName,
      jobTitle,
      jobType,
    };

    setBookmarks((bookmarks) => [newBookmark, ...bookmarks]);
    setJobs((jobs) =>
      jobs.map((job) => (job.id === id ? { ...job, bookmarked: true } : job))
    );
  }

  function handleDeleteBookmark(id) {
    setBookmarks((bookmarks) =>
      bookmarks.filter((bookmark) => bookmark.id !== id)
    );

    setJobs((jobs) =>
      jobs.map((job) => (job.id === id ? { ...job, bookmarked: false } : job))
    );
  }

  function handleReset() {
    setCategory('');
  }

  return (
    <div className="app">
      <Navbar>
        <Logo />

        <Input
          className="search"
          bgColor="#f1f1f1"
          textColor="#141414"
          placeHolder="Search for your job ..."
          id="search"
          onGetValue={setQuery}
        />

        <Button
          className="btn-bookmark"
          onClick={() => setIsOpenModal(true)}>
          <CounterIcon count={bookmarks.length}>
            <BsBookmarks />
          </CounterIcon>
        </Button>
      </Navbar>

      <SideBar>
        <FilterBox>
          <FlexRow>
            <TitleHeading>Filters</TitleHeading>
            <Button
              className="btn-reset"
              onClick={handleReset}>
              Reset
            </Button>
          </FlexRow>

          <FlexRow>
            <Accordian title="Job Type">
              <CheckBoxList data={jobTypes} />
            </Accordian>
          </FlexRow>

          <FlexRow>
            <TitleHeading>Open to Remote </TitleHeading>
            <Toggle />
          </FlexRow>

          <FlexRow>
            <Accordian title="Job Categories">
              <Input
                minWidth="100%"
                bgColor="#f1f1f1"
                textColor="#141414"
                placeHolder="Search ..."
                borderRadius=".3rem"
                className="margin-block-10"
                id="searchCategory"
                onGetValue={handleSearchCategory}
              />

              <CheckBoxList
                data={categories}
                onGetValue={setCategory}
                selectedItem={category}
              />
            </Accordian>
          </FlexRow>
        </FilterBox>
      </SideBar>

      <Main
        jobs={jobs}
        bookmarks={bookmarks}
        isLoading={isLoading}
        error={error}
        onAddBookmark={handleAddBookmark}
      />

      {isOpenModal && (
        <Modal
          onCloseModal={setIsOpenModal}
          count={bookmarks.length}>
          <BookmarsList
            bookmarks={bookmarks}
            onDelete={handleDeleteBookmark}
          />
        </Modal>
      )}
    </div>
  );
}
