import { useEffect, useState } from 'react';
import { BASE_URL } from './../config';

export function useJobs(query) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchJobs() {
        try {
          setIsLoading(true);
          setError('');
          //   const res = await fetch(`${BASE_URL}?tag=${query}`, {
          const res = await fetch(`${BASE_URL}?tag=${query}`, {
            signal: controller.signal,
          });

          if (!res.ok)
            throw new Error('Something happend with fetching jobs !');

          const data = await res.json();

          if (data.jobCount === 0)
            throw new Error('No suitable jobs found in the current query !');

          setJobs(data.jobs);
        } catch (err) {
          if (err.name !== 'AbortError') {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 2) {
        setJobs([]);
        setError('');
        return;
      }

      fetchJobs();

      return () => controller.abort();
    },

    [query]
  );

  return { jobs, setJobs, isLoading, setIsLoading, error, setError };
}
