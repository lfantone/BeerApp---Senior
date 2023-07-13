import { Box, CircularProgress, Fab } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Favorite } from '@mui/icons-material';
import { MouseEventHandler } from 'react';

type ActionBarProps = {
  children: React.ReactNode,
};

type FavoriteButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>,
  disabled: boolean,
  color?: string,
  loading?: boolean,
};

export function FavoriteButton({ onClick, disabled, color = grey[500], loading }: FavoriteButtonProps) {
  return (
    <Fab aria-label="like" onClick={onClick} disabled={disabled}>
      {loading ? <CircularProgress /> : <Favorite htmlColor={color} />}
    </Fab>
  );
}

function ActionBar({ children }: ActionBarProps) {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 }, position: 'absolute', right: 0 }}>
      {children}
    </Box>
  );
}

export default ActionBar;
