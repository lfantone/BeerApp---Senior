import { Button, FormGroup } from "@mui/material";

type SearchBarProps = {
  className?: string,
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  children: React.ReactNode,
};

function SearchBar({ className, onSubmit, children }: SearchBarProps) {
  return (
    <form className={className} onSubmit={onSubmit}>
      <FormGroup>
        {children}
      </FormGroup>
      <Button variant='contained' type='submit'>Search</Button>
    </form>
  );
}

export default SearchBar;
