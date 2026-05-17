# Easy Meal — Recipe Search & Meal Planner
 
Easy Meal is a single-page application that allows you to search for recipes and build an alphabetically ordered shopping list of ingredients. It is powered by the [TheMealDB API](https://www.themealdb.com/) and stores your shopping list locally in your browser.
 
---

## Tech Stack
 
- [Next.js](https://nextjs.org/) with TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [TheMealDB API](https://www.themealdb.com/api.php)
- Browser `localStorage` for persisting the shopping list
- Docker for local development

---

## Getting Started
 
### Prerequisites
 
- [Docker](https://www.docker.com/) installed and running on your machine

### Running Locally
 
1. From the root of the repository, run:
```bash
docker compose up
```
 
2. Open your browser and navigate to:
```
http://localhost:3000
```