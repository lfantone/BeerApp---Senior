import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../utils/db';
import { red } from '@mui/material/colors';

function FavoriteList() {
  const beers = useLiveQuery(() => db.beers.filter(beer => beer.favorite || false).toArray());
  const navigate = useNavigate();
  const onBeerClick = (id: string) => navigate(`/beer/${id}`);
  const hasBeers = beers && beers.length > 0;
  const createOnClickHandler = (id: string) => () => onBeerClick(id);

  return (
    <article>
      <Typography variant="h3">Your favorite beers</Typography>
      <section>
        {hasBeers ? (
          <List>
            {beers.map((beer) => (
              <ListItemButton key={beer.id} onClick={createOnClickHandler(beer.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <Favorite htmlColor={red[500]} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} />
              </ListItemButton>
            ))}
          </List>
        ) : (
          <Typography sx={{ marginTop: 2.5 }} variant="body1">You don't have any favorite beers yet.</Typography>
        )}
      </section>
    </article>
  );
};

export default FavoriteList;
