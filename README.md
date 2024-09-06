# Next.js Star Wars Planets App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and demonstrates how to build a paginated list of Star Wars planets using the SWAPI.

## Getting Started

First, clone this repo and run:
npm install

so, run the development server:

npm run dev

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Inter, a custom Google Font.

Testing
To ensure the application is functioning as expected, this project includes tests using Jest and React Testing Library.

Running Tests
To run the tests, use the following command:

npm test

## What I did

I started by working on the basics requirements:

- The user should be able to search for planets;
- The user should be able to paginate the list of planets;
- The user should be able to see details about the selected planet.

To work on this I needed to check the SWAPI documentation, I used Postman to check how this API works and how the data was formated. So I mounted a Nextjs application, very simple to finish these basic requirement.
After that, I read about TanStack Query / SWR to see if was feasible for me trying to use this tool.
So, I worked in a nice design using CSS, writed tests and I check if everything was possible to use in a cellphone layout.

I will be glad to hear any feedbacks from you !!
