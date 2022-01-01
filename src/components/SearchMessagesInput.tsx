import React, { useState, useEffect } from "react";

interface Props {
  handleSearch: Function;
}

const SearchMessagesInput = ({ handleSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    //The code that adjust the message to be displayed based on searh term
    handleSearch(searchTerm);
  }, [searchTerm]);
  return (
    <input
      placeholder="Search messages"
      className="px-3 py-0.5 w-56 ml-3 bg-transparent rounded-2xl border-solid border-2  border-blue-600 outline-none text-blue-800"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchMessagesInput;
