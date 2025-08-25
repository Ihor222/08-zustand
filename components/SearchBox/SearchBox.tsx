import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (query: string) => void;
}

const SearchBox = ({ value, onSearch }: SearchBoxProps) => {
  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const currentValue = e.currentTarget.value;
    onSearch(currentValue);
  }

  return (
    <input
      className={css.input}
      type="search"
      aria-label="Search notes"
      placeholder="Search notes"
      value={value}
      onChange={onInputChange}
      autoComplete="off"
      spellCheck={false}
    />
  );
};

export default SearchBox;
