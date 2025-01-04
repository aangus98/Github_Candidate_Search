import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API'; 
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [userSearchError, setUserSearchError] = useState(''); 

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub();
        const formattedCandidates: Candidate[] = data.map((item: any) => ({
          id: item.id,
          name: item.login,
          username: item.login,
          location: item.location || null,
          avatar: item.avatar_url,
          email: item.email || null, 
          html_url: item.html_url,
          company: null, 
        }));
        setCandidates(formattedCandidates);
      } catch (err) {
        setError('error fetching candidates');
      }
      setLoading(false);
    }

    fetchCandidates();
  }, []);

  const handleUserSearch = async () => {
    if (searchQuery.trim() === '') return; 
    setUserSearchError(''); 

    try {
      const data = await searchGithubUser(searchQuery); 
      const searchedUser: Candidate = {
        id: data.id,
        profilepic: data.avatar_url,
        name: data.login,
        location: data.location || null,
        email: data.email || null,
        username: data.login,
        company: data.company || null,
        url: data.html_url,
      };
      setCandidates([searchedUser]);
      setCurrentIndex(0); 
    } catch (err) {
      setUserSearchError('User not found or failed to fetch user.');
    }
  };

  const saveCandidate = () => {
    const candidateToSave = candidates[currentIndex];
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidateToSave);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    nextCandidate();
  };

  const removeCandidate = () => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    const updatedCandidates = savedCandidates.filter(
      (candidate: Candidate) => candidate.id !== candidates[currentIndex].id
    );
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    nextCandidate();
  };

  const nextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('No more candidates available.');
    }
  };

  if (loading) {
    return <h2>Loading candidates...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const currentCandidate = candidates[currentIndex];

  return (
    <div>
      <h1>Candidate Search</h1>

      <div>
        <input 
          type="text" 
          placeholder="Search GitHub User" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button onClick={handleUserSearch}>Search</button>
        {userSearchError && <p>{userSearchError}</p>}
      </div>

      {currentCandidate ? (
        <div key={currentCandidate.id} className="candidate-card">
          <img
            src={currentCandidate.profilepic}
            alt={`${currentCandidate.name}'s avatar`}
            className="candidate-avatar"
          />
          
          <div className="candidate-info">
            <h2>{currentCandidate.name}</h2>
            <p>
              <a href={currentCandidate.url} target="_blank" rel="noopener noreferrer">
                View GitHub Profile
              </a>
            </p>
            <p>{currentCandidate.location}</p> 
          </div>
        </div>
      ) : (
        <p> candidates not found.</p>
      )}

      <div>
        <button onClick={removeCandidate}>Reject</button>
        <button onClick={saveCandidate}>Save</button>
      </div>
    </div>
  );
};

export default CandidateSearch;
