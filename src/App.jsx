import './App.css';
import { useState } from 'react';

function App() {
  const [ids, setIds] = useState([]);

  const identifiers = ['WD', 'CATH', 'SKIP', 'SEARCH', 'ENT'];
  const regexPattern = `\\b(${identifiers.join('|')})\\s?-\\s?\\d{3,6}\\b`;
  const regex = new RegExp(regexPattern, 'g');

  const onChange = (text) => {
    if(!text) {
      setIds([]);
    }
    let matchedIds = text.match(regex);
    matchedIds = matchedIds.map(id => id.replace(/\s?-\s?/, '-'));
    const uniqueIds = matchedIds ? Array.from(new Set(matchedIds)).sort() : [];
    setIds(uniqueIds || []);
  };

  return (
    <>
      <h1>ID Extractooooor</h1>
      <p>Paste here:</p>
      <textarea
        cols={50}
        rows={20}
        onChange={(e) => onChange(e.target.value)}
      />
      {ids.length > 0 ? (
      <>
      <h2>IDS:</h2>
      <ul>
        {ids.map((id, index) => (
          <li key={index} style={{ listStyle: 'none' }}>
            {id}
          </li>
        ))}
      </ul>
      </>) : null}
    </>
  );
}

export default App;