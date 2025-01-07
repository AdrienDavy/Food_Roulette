interface SearchBarProps {
  setSearch: (value: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearch, placeholder }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };
  return (
    <form className="w-full">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-primary sr-only dark:text-primary-dark"
      >
        Rechercher
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-primary dark:text-primary-dark "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          onChange={handleSearchChange}
          type="search"
          id="default-search"
          className=" placeholder:text-primary dark:placeholder:text-primary-dark block w-full p-4 ps-10 text-sm text-primary dark:text-primary-dark rounded-lg hover:text-primary-hover dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover focus:text-primary-focus dark:focus:text-primary-dark-focus focus:bg-secondary-focus dark:focus:bg-secondary-dark-focus focus:outline-double focus:outline-primary-focus focus:border-primary  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-dark dark:focus:border-primary-dark"
          placeholder={placeholder}
          required
        />
        <button
          type="button"
          className="text-secondary dark:text-secondary-dark absolute end-2.5 bottom-2.5 bg-primary hover:bg-primary-hover focus:ring-1 focus:outline-none focus:ring-primary-focus font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-dark dark:hover:bg-primary-dark-hover dark:focus:bg-primary-dark-focus"
        >
          Rechercher
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
