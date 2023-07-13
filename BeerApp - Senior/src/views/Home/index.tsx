import { useState } from 'react';
import { ApiParams, Beer, TYPE } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link, Switch, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { useBeers } from '../../api/use-beers';
import List, { CheckboxListItem } from '../../components/List';
import SearchBar from '../../components/SearchBar';
import styles from './Home.module.css';

const DEFAULT_PAGE_SIZE = 15;

function Home() {
  const [savedList,] = useState<Array<Beer>>([]);
  const [params, setParams] = useState<ApiParams>({ sort: 'asc', page: 1 });
  const { data, loading } = useBeers({ per_page: DEFAULT_PAGE_SIZE, ...params });
  const onPageChangeHandler = (event: React.ChangeEvent<unknown>, page: number) => {
    setParams((params) => ({ ...params, page }));
  };
  const onFormSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    setParams((params) => ({
      ...params,
      by_name: formData.get('name') as string,
      by_type: formData.get('type') === 'all' ? undefined : formData.get('type') as TYPE,
      sort: formData.get('sort') === 'on' ? 'asc' : 'desc',
    }));
  };

  return (
    <article>
      <section>
        <Paper>
          <div className={styles.listContainer}>
            <SearchBar className={styles.listHeader} onSubmit={onFormSubmitHandler}>
              <TextField name="name" label='Filter...' variant='outlined' defaultValue={params?.by_name} />
              <FormControlLabel control={<Switch name="sort" defaultChecked={params?.sort === 'asc'} />} label="Sort alphabetically" />
              <RadioGroup
                aria-labelledby="Select type of brewery"
                defaultValue={params?.by_type ?? 'all'}
                name="type"
                row
              >
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel value="micro" control={<Radio />} label="Micro" />
                <FormControlLabel value="nano" control={<Radio />} label="Nano" />
                <FormControlLabel value="regional" control={<Radio />} label="Regional" />
                <FormControlLabel value="brewpub" control={<Radio />} label="Brewpub" />
                <FormControlLabel value="large" control={<Radio />} label="Large" />
                <FormControlLabel value="planning" control={<Radio />} label="Planning" />
                <FormControlLabel value="contract" control={<Radio />} label="Contract" />
                <FormControlLabel value="proprietor" control={<Radio />} label="Proprietor" />
                <FormControlLabel value="closed" control={<Radio />} label="Closed" />
              </RadioGroup>
            </SearchBar>
            <List loading={loading} page={data?.page} pageCount={data?.total} onPageChange={onPageChangeHandler}>
              {data?.items?.map((beer) => <CheckboxListItem key={beer.id} id={beer.id} label={beer.name} href={`beer/${beer.id}`} />)}
            </List>
          </div>
        </Paper>

        <Paper>
          <div className={styles.listContainer}>
            <div className={styles.listHeader}>
              <h3>Saved items</h3>
              <Button variant='contained' size='small'>
                Remove all items
              </Button>
            </div>
            <ul className={styles.list}>
              {savedList.map((beer, index) => (
                <li key={index.toString()}>
                  <Checkbox />
                  <Link component={RouterLink} to={`/beer/${beer.id}`}>
                    {beer.name}
                  </Link>
                </li>
              ))}
              {!savedList.length && <p>No saved items</p>}
            </ul>
          </div>
        </Paper>
      </section>
    </article>
  );
};

export default Home;
