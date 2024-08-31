"use client";

import SearchResultsPage from "@/components/User/Search/SearchResults";

interface MovieProp {
  params: {
    query: string;
  };
}

const SearchResultsPageWrapper: React.FC<MovieProp> = ({ params }) => {
  const { query } = params;

  console.log(query);

  return <SearchResultsPage query={query} />;
};

export default SearchResultsPageWrapper;
