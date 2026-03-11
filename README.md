# frbk.org
Website

## Environment

For normal local development and production runtime, the site only needs:

- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`

`SANITY_WRITE_TOKEN` is optional and is only used when running the one-off migration script in [scripts/migrate-hugo-to-sanity.mjs](/Users/chrorvik/Prosjekt/frbk.org/scripts/migrate-hugo-to-sanity.mjs).

For Sanity Presentation / preview, you can additionally use:

- `PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true`
- `SANITY_API_READ_TOKEN` for draft preview

## License
Code is licensed under the MIT License.
Content and media are © Fiksdal Rekdal Ballklubb.
