import React, { useState } from "react";

function TaskSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/search/issues?q=${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search">
      <div className="searchArea">
        <h3 className="searchTitle">Look for something?</h3>
        <input
          className="SearchInput"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="button-13">
          Search
        </button>
      </div>

      <ul>
        {searchResults.slice(0, 10).map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskSearch;
