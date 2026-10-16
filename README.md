# The Website Workshop

A one-page portfolio for a website design studio. It includes selected work, services, the working approach, a short about section, and a contact note.

## Run it on localhost

From this folder:

```bash
npm install
npm run dev
```

Vite prints a local address, usually [http://localhost:5173](http://localhost:5173). Open that in your browser. The page reloads when you edit the files.

To check the production build locally:

```bash
npm run build
npm run preview
```

## Make it yours

- Words, projects, and services live in `index.html`.
- Colors, type, and layout live in `src/style.css`.
- Menu, project notes, and the contact form live in `src/main.js`.
- On the contact form, set `data-email="you@example.com"` so “Send a note” opens the visitor’s mail app. Until then, the form only confirms the note in the browser.

## Publish on GitHub

This project is a normal git repository. After you change files:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

The repository is [github.com/Babu-Bhandari/The-Website-Workshop](https://github.com/Babu-Bhandari/The-Website-Workshop). Later pushes update that same repository.
