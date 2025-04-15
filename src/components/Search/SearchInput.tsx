const SearchInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input type="text" placeholder="Search movies..." {...props} />;
};

export default SearchInput;
