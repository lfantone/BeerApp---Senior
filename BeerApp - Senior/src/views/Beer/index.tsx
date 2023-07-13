import { useState } from 'react';
import { red, grey } from '@mui/material/colors';
import { Beer as IBeer } from '../../types';
import { useParams } from 'react-router-dom';
import { GMAPS_API_KEY } from '../../api/config';
import { Box, LinearProgress } from '@mui/material';
import { BusinessOutlined, LocationCityOutlined, PublicOutlined, LocalPhoneOutlined, LinkOutlined, MapsHomeWorkOutlined } from '@mui/icons-material';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../utils/db';
import Hero from '../../components/Hero';
import Section from '../../components/Section';
import Map from '../../components/Map';
import Details, { DetailItem, DetailItemLink, DetailItemText } from '../../components/Details';
import Gallery from '../../components/Gallery';
import ActionBar, { FavoriteButton } from '../../components/ActionBar';
import styles from './beer.module.css';
import { useBeer } from '../../api/use-beers';

const DEFAULT_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ultrices metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla mattis tristique ipsum in dapibus. Donec maximus turpis ac aliquam egestas. Nulla facilisi. Sed vitae urna at metus venenatis consequat. Vivamus quis consectetur felis. Curabitur posuere felis sit amet ante porttitor fermentum ut a sapien.';

function createDetailsFrom(beer: IBeer) {
  return [
    <DetailItem key={`${beer.id}-address`} title="Address" icon={BusinessOutlined}><DetailItemText value={beer.address_1 || beer.address_2 || beer.address_3} /></DetailItem>,
    <DetailItem key={`${beer.id}-city`} title="City" icon={LocationCityOutlined}><DetailItemText value={beer.city} /></DetailItem>,
    <DetailItem key={`${beer.id}-state`} title="State" icon={MapsHomeWorkOutlined}><DetailItemText value={beer.state} /></DetailItem>,
    <DetailItem key={`${beer.id}-country`} title="Country" icon={PublicOutlined}><DetailItemText value={beer.country} /></DetailItem>,
    <DetailItem key={`${beer.id}-phone`} title="Phone" icon={LocalPhoneOutlined}><DetailItemLink href={`tel:${beer.phone}`} value={beer.phone} /></DetailItem>,
    <DetailItem key={`${beer.id}-website`} title="Website" icon={LinkOutlined}><DetailItemLink href={beer.website_url} value={beer.website_url} /></DetailItem>,
  ];
}

function Beer() {
  const { id } = useParams();
  const { data: beer, loading } = useBeer(id);
  const [isFavoriteLoading, setFavoriteLoading] = useState(false);
  const isFavorite = useLiveQuery(() => db.isBeerFavorite(id), [id]);
  const favoriteColor = isFavorite ? red[500] : grey[500];
  const heroImage = beer?.images.at(Math.floor(Math.random() * beer?.images.length ?? 1));
  const hasCoordinates = beer?.latitude && beer?.longitude;
  const details = beer ? createDetailsFrom(beer) : [];
  const galleryImages = beer ? beer.images.map(image => ({ src: image.src.original, alt: image.alt, bgColor: image.avg_color, id: image.id })) : [];
  const onFavoriteClickHandler = () => {
    setFavoriteLoading(true);
    db.toogleBeerFavorite(id).then(() => setFavoriteLoading(false));
  };

  return (
    <Box component="article">
      {loading && <LinearProgress />}
      <Hero
        className={styles.hero}
        component="header"
        title={beer?.name}
        image={{ bgColor: heroImage?.avg_color, src: heroImage?.src.original, alt: heroImage?.alt }}
        height={600}
      />
      <ActionBar>
        <FavoriteButton onClick={onFavoriteClickHandler} disabled={loading || isFavoriteLoading} color={favoriteColor} loading={isFavoriteLoading} />
      </ActionBar>
      <Section
        className={styles['brewery-type']}
        title={beer?.brewery_type}
        subTitle='Brewery type'
        description={beer?.description ?? DEFAULT_DESCRIPTION}
      />
      <Section
        className={styles['brewery-images']}
        title="Our products"
        subTitle='Our brewery in pictures'
      >
        {galleryImages.length > 0 && <Gallery images={galleryImages} />}
      </Section>
      <Section
        className={styles['brewery-location']}
        title="Find us!"
        subTitle='Location and other useful information'
      >
        {hasCoordinates && <Map latitude={parseFloat(beer.latitude)} longitude={parseFloat(beer.longitude)} apiKey={GMAPS_API_KEY} zoom={15} />}
        <Details className={styles.details}>{details}</Details>
      </Section>
    </Box>
  );
};

export default Beer;
