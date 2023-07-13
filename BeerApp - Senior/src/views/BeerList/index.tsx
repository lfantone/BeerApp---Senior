import { Avatar, LinearProgress, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
import { useBeers } from '../../api/use-beers';

const BeerList = () => {
  const navigate = useNavigate();
  const { data, loading } = useBeers();
  const createClickHandler = (id: string) => () => navigate(`/beer/${id}`);

  return (
    <article>
      <Typography variant="h3">All the beers are here</Typography>
      {loading && <LinearProgress />}
      <List>
        {data?.items.map((beer) => (
          <ListItemButton key={beer.id} onClick={createClickHandler(beer.id)}>
            <ListItemAvatar>
              <Avatar>
                <SportsBar />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={beer.name} secondary={beer.brewery_type} />
          </ListItemButton>
        ))}
      </List>
    </article>
  );
};

export default BeerList;
