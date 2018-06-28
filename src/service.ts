import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { ajax } from 'rxjs/observable/dom/ajax';

const apiKey = 'a1caefa9e77ca91bd26d8ef882752125';

export enum PageDirection {
    BACK,
    FORWARD,
}

export const fetchPhotos = (
    searchText: string,
    pageSize: number = 2,
    pageDirection?: PageDirection
) => {
    const request = {
        crossDomain: true,
        method: 'GET',
        url:
            'https://api.flickr.com/services/rest?' +
            'method=flickr.photos.search' +
            `&api_key=${apiKey}` +
            `&tags=${searchText}` +
            `&per_page=${pageSize}` +
            '&format=json' +
            '&nojsoncallback=1',
    };
    return ajax(request).map((e: any) => {
        return e.status === 200
            ? e.response.photos.photo.map((photo: any) => {
                  return {
                      id: photo.id,
                      title: photo.title,
                      url: `https://farm${photo.farm}.staticflickr.com/${
                          photo.server
                      }/${photo.id}_${photo.secret}_m.jpg`,
                  };
              })
            : [];
    });
};
