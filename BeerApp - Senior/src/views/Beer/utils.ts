import { AxiosResponse } from 'axios';
import { getBeer, getBeerImages } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';
import { db } from '../../utils/db';

const toBeer = ([beerResponse, imagesResponse]: [AxiosResponse, AxiosResponse]): Beer => ({
  ...beerResponse.data,
  images: imagesResponse.data?.photos,
})

const fetchData = (setData: (data: Beer) => void, id?: string) => {
  if (!id) return;

  (async () => {
    try {
      const beer = await Promise.all([getBeer(id), getBeerImages()]).then(toBeer)
      console.log('beer fetched', beer);
      db.setBeer(beer);
      setData(beer);
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData };
