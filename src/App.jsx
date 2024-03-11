import './App.css';
import { useState, useRef } from 'react';

function App() {
  const [ids, setIds] = useState([]);
  const dialogRef = useRef(null);

  const identifiers = ['WD', 'CATH', 'SKIP', 'SEARCH', 'ENT'];
  const regexPattern = `\\b(${identifiers.join('|')})\\s?-\\s?\\d{3,6}\\b`;
  const regex = new RegExp(regexPattern, 'g');

  const onChange = (text) => {
    if (!text) {
      setIds([]);
      return;
    }

    let matchedIds = text.match(regex);

    if (!matchedIds) {
      setIds([]);
      return;
    }

    matchedIds = matchedIds.map(id => id.replace(/\s?-\s?/, '-'));
    const uniqueIds = Array.from(new Set(matchedIds)).sort();

    setIds(uniqueIds);
  };

  const copyToClipboard = () => {
    const idsToCopy = ids.join('\n');
    navigator.clipboard.writeText(idsToCopy).then(() => {
      if (dialogRef.current) {
        
        dialogRef.current.showModal();

        setTimeout(() => {
          dialogRef.current.close();
        }, 1500);

      }
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <>
      <h1>Jira Ticket ID Extractor</h1>
      <p>Paste here</p>
      <textarea
        cols={50}
        rows={20}
        onChange={(e) => onChange(e.target.value)}
      />
      {ids.length > 0 ? (
        <>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 40}}>
            <h2 style={{margin: 0, marginRight: 20}}>IDS</h2>
            <button
              onClick={copyToClipboard}
              title="Click to copy all IDs to clipboard"
              style={{ cursor: 'pointer'}}
            >
              Copy All IDs
            </button>
          </div>
          <ul style={{paddingInlineStart: 0}}>
            {ids.map((id, index) => (
              <li key={index} style={{ listStyle: 'none' }}>
                {id}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <dialog ref={dialogRef}>IDs copied to clipboard!</dialog>
    </>
  );
}

export default App;