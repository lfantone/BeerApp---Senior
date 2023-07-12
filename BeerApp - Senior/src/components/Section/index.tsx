import { grey } from '@mui/material/colors';
import { Box, Typography } from "@mui/material";

type SectionProps = {
  className?: string,
  description?: string,
  title?: string
  subTitle?: string
  children?: React.ReactNode
};

function Section({ description, title, subTitle, children, className }: SectionProps) {
  return (
    <Box component="section" className={className} sx={{}}>
      {title && (
        <Typography variant="h3" fontWeight={600}>
          {title}
        </Typography>)
      }
      {subTitle && (
        <Typography variant="subtitle1" color={grey[600]} gutterBottom>
          {subTitle}
        </Typography>)
      }
      {description && (
        <Typography variant="body1" paragraph>
          {description}
        </Typography>)
      }
      {children}
    </Box >
  );
}

export default Section;
