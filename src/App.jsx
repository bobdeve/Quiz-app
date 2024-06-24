import React, { useContext } from 'react';
import './App.css';
import { DataContext } from './components/DataContext';
import Quiz from './components/Quiz'; // Adjust the path if needed
import { ChooseQuiz } from './components/ChooseQuiz';

function App() {
  const { data, loading, error, handleCategory, handleReset } = useContext(DataContext);

  console.log(data);

  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data.length === 0 && !loading ? (
        <ChooseQuiz selectCatagory={handleCategory} />
      ) : (
        <Quiz onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
