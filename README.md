#  🌱 Little Seed, BIG Garden capstone project

A web application for selling herb and vegetable seeds using the PERN (PostgreSQL, Express.js, React, Node.js) stack. 

##  🏁 Getting Started

1. **Don't fork or clone this repo!** Instead, create a new, empty directory on your machine and `git init` (or create an _empty_ repo on GitHub and clone it to your local machine)

2. Add this template as a remote and merge it into your own repository

```bash
git remote add boilermaker git@github.com:2401-Group-A/Capstone-EComSite.git
git fetch boilermaker
git merge boilermaker/main
```

3. Install packages

```bash
npm i
```

4. Add a `.env` file with your secret value for auth
```
JWT_SECRET='somesecretvalue'
```

5. Create the database

```bash
createdb little_seed
```

6. Update `src/server/db/client.js` to reflect the name of your database

```js
const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/little_seed';
```

7. Seed the database
```bash
npm run seed
```

8. Start the server
```bash
npm run dev
```

9. Open your browser at `http://localhost:3000`

10. Build something cool! 😎