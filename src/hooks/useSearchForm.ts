import { useState } from "react";
import { Route } from "@/routes/venues/index";

export const useSearchForm = () => {
  const navigate = Route.useNavigate();
  const {query: urlQuery} = Route.useSearch();
  const [inputQuery, setInputQuery] = useState(urlQuery);
  const showClearSearch =
    inputQuery.length > 0 && inputQuery.trim() === urlQuery && urlQuery.length > 0;

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = inputQuery.trim();
    setInputQuery(trimmedQuery);
    navigate({ search: (prev) => ({ ...prev, query: trimmedQuery, page: 1})})
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setInputQuery("");
    navigate({ search: (prev) => ({ ...prev, query: "", page: 1})})
  };

  return {
    inputQuery,
    showClearSearch,
    handleSubmit,
    handleOnChange,
    handleClearSearch,
  };
};
