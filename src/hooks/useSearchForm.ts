import { useState } from "react";

export const useSearchForm = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const showClearSearch =
    submittedQuery.length > 0 && inputQuery.trim() === submittedQuery;

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = inputQuery.trim();
    setInputQuery(trimmedQuery);
    setSubmittedQuery(trimmedQuery);

    console.log("Search query: ", trimmedQuery)
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setInputQuery("");
    setSubmittedQuery("");
  };

  return {
    inputQuery,
    showClearSearch,
    handleSubmit,
    handleOnChange,
    handleClearSearch,
  };
};
