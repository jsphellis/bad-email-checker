import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const App = () => {
  const [text, setText] = useState('');
  const [spamScore, setSpamScore] = useState(0);
  const [flaggedWords, setFlaggedWords] = useState([]);
  const [spamWords, setSpamWords] = useState({});

  useEffect(() => {
    const fetchSpamWords = async () => {
      const { data, error } = await supabase.from('spam_words').select('*');

      if (error) {
        console.error('Error fetching spam words:', error);
      } else {
        const wordsByCategory = {};
        data.forEach(item => {
          if (!wordsByCategory[item.category]) {
            wordsByCategory[item.category] = {
              severity: item.severity,
              words: []
            };
          }
          wordsByCategory[item.category].words.push(item.word);
        });
        setSpamWords(wordsByCategory);
      }
    };

    fetchSpamWords();
  }, []);

  const getSpamScore = (text) => {
    const words = text.split(/\s+/);
    let score = 0;
    let flaggedWords = [];

    words.forEach((word) => {
      const lowerWord = word.toLowerCase();
      for (const category in spamWords) {
        if (spamWords[category].words.includes(lowerWord)) {
          const severity = spamWords[category].severity;
          if (severity === 'high') score += 50;
          else if (severity === 'medium') score += 30;
          else if (severity === 'low') score += 10;
          flaggedWords.push({ word, severity });
        }
      }
    });

    score = Math.min(score, 100);
    return { score, flaggedWords };
  };

  const handleChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
    const { score, flaggedWords } = getSpamScore(inputText);
    setSpamScore(score);
    setFlaggedWords(flaggedWords);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Cleaned text copied to clipboard!');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold">Email Spam Checker</h1>
      </header>
      <main className="flex-1 p-4 w-7/12">
        <textarea
          className="w-full h-64 p-2 border border-gray-300 rounded"
          value={text}
          onChange={handleChange}
          placeholder="Type or paste your email content here..."
        />
        <div className="mt-4">
          <h2 className="text-xl">Spam Score: {spamScore}%</h2>
          <h3 className="text-lg">Flagged Words:</h3>
          <ul>
            {flaggedWords.map((item, index) => (
              <li key={index} className={`text-${item.severity === 'high' ? 'red' : item.severity === 'medium' ? 'yellow' : 'green'}-600`}>
                <span className="cursor-pointer" onClick={() => alert(`The word "${item.word}" is flagged as ${item.severity} risk.`)}>
                  {item.word}
                </span> - {item.severity}
              </li>
            ))}
          </ul>
        </div>
      </main>
      <aside className="w-5/12 p-4 bg-white shadow">
        <h2 className="text-xl">Analysis Results</h2>
        <p>Overall Spam Score: {spamScore}%</p>
        <p>Number of Flagged Words: {flaggedWords.length}</p>
        <h3 className="text-lg">Detected Spam Words:</h3>
        <ul>
          {flaggedWords.map((item, index) => (
            <li key={index}>{item.word} ({item.severity})</li>
          ))}
        </ul>
        <h3 className="text-lg">Fetched Spam Words:</h3>
        <ul>
          {Object.entries(spamWords).map(([category, { words }]) => (
            <li key={category}>
              <strong>{category}</strong>: {words.join(', ')}
            </li>
          ))}
        </ul>
      </aside>
      <footer className="bg-white p-4 flex justify-between">
        <span>Word Count: {text.split(/\s+/).filter(Boolean).length}</span>
        <button onClick={copyToClipboard} className="bg-blue-500 text-white px-4 py-2 rounded">Copy Cleaned Text</button>
      </footer>
    </div>
  );
};

export default App;
