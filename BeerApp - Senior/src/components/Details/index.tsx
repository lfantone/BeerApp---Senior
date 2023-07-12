import { Typography, Stack, Card, CardContent } from '@mui/material';

type ItemProps = {
  icon?: React.ElementType,
  children: React.ReactNode,
  title: string,
}

export function DetailItemText({ value }: { value?: string }) {
  return <Typography
    sx={{ display: 'inline' }}
    component="span"
    variant="body2"
    color="text.primary"
  >
    {value}
  </Typography>
}

export function DetailItemLink({ href, value }: { href?: string, value?: string }) {
  return (
    <Typography
      sx={{ display: 'inline' }}
      component="a"
      variant="body2"
      color="text.primary"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {value}
    </Typography>
  );
}

export function DetailItem({ children, icon: Icon, title }: ItemProps) {
  return (
    <Card variant="outlined" sx={{ mt: { sm: 1.5, md: 2.25 }, minWidth: 300 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5, display: 'flex', gap: 2 }} color="text.secondary">
          {Icon && <Icon />}
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}

type DetailsProps = {
  children: React.ReactElement<ItemProps> | React.ReactElement<ItemProps>[],
  className?: string,
}

function Details({ children, className }: DetailsProps) {
  return (
    <Stack className={className} spacing={{ xs: 1, sm: 2 }} useFlexGap flexWrap="wrap" direction={{ md: 'row' }}>
      {children}
    </Stack>
  );
}

export default Details;
