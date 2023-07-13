import { Checkbox, CircularProgress, IconButton, ListItem as MUIListItem, ListItemButton, ListItemIcon, ListItemText, List as MUIList, Pagination } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Children } from 'react';

type ListProps = {
  children: React.ReactNode;
  loading: boolean;
  page?: number;
  onPageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
  pageCount?: number;
}

type CheckboxListItemProps = {
  label: string,
  id: string,
  href?: string,
}

export function NoResultListItem() {
  return (
    <MUIListItem sx={{ justifyContent: 'center' }} disablePadding>
      <ListItemIcon>
        <ListItemText primary="The list is empty. Try filtering for something else" />
      </ListItemIcon>
    </MUIListItem>
  );
}

export function LoadingListItem() {
  return (
    <MUIListItem sx={{ justifyContent: 'center' }} disablePadding>
      <ListItemIcon>
        <CircularProgress />
      </ListItemIcon>
    </MUIListItem>
  );
}

export function CheckboxListItem({ id, label, href }: CheckboxListItemProps) {
  return (
    <MUIListItem
      secondaryAction={
        href && (
          <IconButton edge="end" aria-label="comments">
            <Link to={href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ArrowForward />
            </Link>
          </IconButton>
        )
      }
      disablePadding
    >
      <ListItemButton role={undefined} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': id }}
          />
        </ListItemIcon>
        <ListItemText id={id} primary={label} />
      </ListItemButton>
    </MUIListItem>
  );
}

function List({ children, loading, page, onPageChange, pageCount }: ListProps) {
  const showMessage = Children.count(children) === 0 && !loading;
  return (
    <>
      <MUIList sx={{ width: '100%', bgcolor: 'background.paper', minHeight: 250 }}>
        {loading && <LoadingListItem />}
        {showMessage && <NoResultListItem />}
        {children}
      </MUIList>
      {page && <Pagination sx={{ display: 'flex', justifyContent: 'center' }} count={pageCount} page={page} onChange={onPageChange} />}
    </>
  );
}

export default List;
