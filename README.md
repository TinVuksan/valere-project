# Binge-It

A web application created for providing users with ideas on which movie to watch next. 

It includes latest movies, top movies by genre or a streaming service. 

It also provides users with most watched movies based on popularity and score with filters.

User can mark a movie as a favorite to save it for some later time, or just search a movie for more details about it.

*Owner: Tin Vukšan*

## Project setup

The project itself is a Next.js application that can be containerized using Docker. It can be used for both dev and production environments.

---

## Development

Starting the project locally requires you to create a `.env.development` file and add environment variables based on the provided `.env.template` file.

### Without docker

If you wish to start the project locally without Docker, after you created your `.env.development` file, simply run

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### With docker

1. Make sure you have **Docker** and **Docker Compose** installed
2. Create the `.env.development` file based on `env.template`
3. Run the following command: `npm run dev`

**If you wish to run in production mode locally**

1. Set your `NEXT_PUBLIC_API_ROUTE_URL` in `.env.production` to `http://localhost:3000` 
2. Make sure your project is built - `npm run build`
3. Run `docker-compose -f docker-compose.prod.yml up --build`



