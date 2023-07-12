import { useSpringCarousel } from 'react-spring-carousel'
import { Image } from 'mui-image';
import { Box, MobileStepper } from '@mui/material';
import { useState } from 'react';

type GalleryProps = {
  images: Array<{ src: string, alt: string, bgColor: string }>;
};

function Gallery({ images }: GalleryProps) {
  const [activeItem, setActiveItem] = useState(0)
  const items = images.map((image, index) => ({
    id: String(index),
    renderItem: (
      <Image src={image.src} alt={image.alt} bgColor={image.bgColor} height={500} />
    ),
  }))
  const { carouselFragment, useListenToCustomEvent } = useSpringCarousel({
    items,
    slideType: 'fixed',
    itemsPerSlide: 2,
    withLoop: true,
  })

  useListenToCustomEvent((event) => {
    if (event.eventName === "onSlideStartChange") {
      setActiveItem(parseInt(event.nextItem.id, 10));
    }
  });

  return (
    <Box component="section">
      {carouselFragment}
      {/* <div>{activeItem + 1} / {images.length}</div> */}
      <MobileStepper
        variant="dots"
        steps={images.length}
        position="static"
        activeStep={activeItem}
        sx={{ flexGrow: 1, backgroundColor: 'transparent', flexDirection: 'row-reverse' }}
        backButton={null}
        nextButton={null}
      />
    </Box>
  );
}

export default Gallery;
