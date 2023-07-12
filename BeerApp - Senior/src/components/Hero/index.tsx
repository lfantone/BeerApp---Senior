import { Box, Typography } from '@mui/material';
import { Image } from 'mui-image';

type HeroProps = {
  component: React.ElementType,
  title?: string,
  image?: { src?: string, alt?: string, bgColor?: string },
  height?: number,
  className?: string
};

function Hero({ component = 'section', title, image, height = 500, className }: HeroProps) {
  return (
    <Box component={component} className={className} position="relative">
      {title && <Typography variant="h2" position="absolute" top={0} left={0} zIndex={1} fontWeight="bold">
        {title}
      </Typography>}
      {image?.src && <Image src={image.src} alt={image.alt} bgColor={image.bgColor} easing="ease-in-out" height={height} showLoading />}
    </Box >
  );
}

export default Hero;
