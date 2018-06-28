import * as nock from 'nock';

import { fetchPhotos } from './service';

const host = 'https://api.flickr.com';
// const resource = 'services/rest';
describe('fetchPhotos', () => {
    it('calls flickr api with searchText and pageSize', async () => {
        const mockResponse = {
            photos: {
                photo: [
                    {
                        farm: 'farm',
                        id: 1,
                        secret: 'secret',
                        server: 'server',
                    },
                ],
            },
        };
        nock(host)
            .get((uri: string) => {
                return (
                    uri.includes('tags') &&
                    uri.includes('per_page') &&
                    uri.includes('abc') &&
                    uri.includes('20')
                );
            })
            .reply(200, mockResponse);

        await fetchPhotos('abc', 20);
        nock.isDone();
    });
});
