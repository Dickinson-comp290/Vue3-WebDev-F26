# FlashWord

## From Susan Buck's Vue3.js Course

## Run the app locally

Start the JSON Server backend from the repository root:

```sh
npx json-server web-projects/backend/db.json --port 8100
```

The backend serves `/words` and `/times` on port `8100`. In a second terminal,
start the Vite app:

```sh
cd web-projects/flashword-vite
npm run dev
```

Vite runs on port `5173` and proxies `/api/*` requests to the backend, removing
the `/api` prefix. Thus `/api/words` and `/api/times` reach `/words` and
`/times` on port `8100`, respectively.
