import { createClient } from '@sanity/client';

const sanityClient = createClient(
            {"apiVersion":"v2023-08-24","projectId":"330w38cx","dataset":"production","useCdn":true,"stega":{"studioUrl":"\u002Fstudio"}}
          );

globalThis.sanityClient = sanityClient;

export { sanityClient as s };
