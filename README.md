# Demo Projects page

Useful to keep demo pages and boilerplates for mulitple frameworks. Projects are searchable by name and tags. 

## To clone your own version

```bash
git clone https://github.com/Anish59312/projects-viewer.git
cd projects-viewer
```

## Prerequisites

Before running this project, make sure you have:

- **nextjs** (version 14 or higher)
- **npm** or similar package manager

check my version I use in package.json, yours should compatable.

## Run Locally 

I am using npm, you may use any package manager.

```bash
npm install

npm run dev
```
   
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Adding Your Projects

To add your own projects, edit the `data/projects.json` file:

```json
{
  "projects": [
    {
      "id": "unique-id",
      "name": "Your Project Name",
      "description": "Brief description of your project",
      "hostedLink": "https://your-demo-link.com", // Optional
      "githubLink": "https://github.com/username/repo",
      "tags": ["tag1", "tag2", "tag3"]
    }
  ]
}
```


## Project Structure

```
projects-viewer/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   └── ui/                  # Reusable UI components (shadcn/ui)
├── data/
    └── projects.json        # Project data file
```

## Contact

For questions or suggestions, feel free to reach out or open an issue on GitHub.