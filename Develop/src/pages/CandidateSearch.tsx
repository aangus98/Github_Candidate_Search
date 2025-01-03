import React, { useState, useEffect } from 'react';
import { searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDefaultCandidates = async () => {
    setLoading(true);
    try {
      const searchResults = await searchGithubUser('default'); // Replace 'default' with a suitable default query
      console.log(searchResults);
      setResults(searchResults);
    } catch (err) {
      setError((err as Error).message || 'Failed to fetch default candidates.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultCandidates(); // Fetch default candidates on component mount
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const searchResults = await searchGithubUser(query);
      setResults(searchResults);
    } catch (err) {
      setError((err as Error).message || 'Failed to fetch results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Candidate Search</h1>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search candidates on GitHub..."
          style={{ padding: '10px', width: '70%' }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px',
            marginLeft: '10px',
            backgroundColor: '#007BFF',
            color: '#FFF',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {results.map((candidate) => (
          <li key={candidate.id}>
            <strong>{candidate.name}</strong> - {candidate.email || 'Email not provided'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;
