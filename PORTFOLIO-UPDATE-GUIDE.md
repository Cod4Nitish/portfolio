# Update the portfolio

All portfolio content lives in one file:

`content/portfolio-data.js`

Open that file in any text editor, save it, and refresh the website. The site itself has no build step. Your résumé is intentionally kept as a separate PDF, so website edits never rewrite it.

## Add a tool you learn

Inside the `tools` list, copy one tool line and change the details. A new card will appear automatically in the Toolkit and in the site search. It will already support click-to-select and drag-to-reorder—no HTML or CSS edit is needed.

```js
{
  id: "git", // lower-case, no spaces; use hyphens if needed
  label: "Git + GitHub",
  role: "Version control, collaboration, and public builds.",
  icon: "https://cdn.simpleicons.org/git/F05032",
  fill: "#ffe8df", // selected-card background
  strong: "#f05032", // selected-card border and tick colour
},
```

Use an official logo URL or a simple icon URL in `icon`. If you have no logo yet, leave `icon` empty and the card will use the first letter of the tool name. Keep `fill` and `strong` as six-digit hex colours beginning with `#` so every new card gets its own tidy colour without changing the design.

## Add a project

Copy one project object inside `projects` and update its values:

```js
{
  title: "Project name",
  eyebrow: "Short project type",
  description: "One clear sentence explaining what it does.",
  tags: ["React", "Python", "Gemini"],
  category: "ai", // "ai", "product", or "foundation"
  status: "Public", // or "Private" / "Confidential" / "Selected build"
  href: "https://your-live-project.example", // use null when there is no public live link
  repository: "https://github.com/your-repository", // optional: separate public source button
  action: "Explore project",
  accent: "blue", // "blue", "coral", "violet", "mint", or "sun"
  featured: false, // set true only for a main project at the top of the page
  featuredOrder: null, // use 1–5 only when featured is true
},
```

The top “Main projects” area shows the project entries with `featured: true`. Use `featuredOrder: 1` through `featuredOrder: 5` to control their display order. Keep every other entry under “Small builds”. For a private or company project, set `href: null` and use a clear status such as `"Confidential"`; never put an employer name, repository, or internal detail in the public copy. For multiple public destinations—such as two Snapchat filters—add `extraLinks: [{ label: "Try filter 02", href: "https://example.com" }]`; each becomes a separate safe action.

## Automatic GitHub projects

Public repositories are already connected through this block near the top of `content/portfolio-data.js`:

```js
githubSync: {
  username: "Cod4Nitish",
  maxRepos: 30,
  cacheMinutes: 30,
  excludeRepos: ["Cod4Nitish"], // profile README, not a project card
},
```

You do not need to add a Small builds card every time you create a public repository. After the 30-minute browser cache window, a refresh reads the public GitHub list and adds the repository’s title, description, language/topics, live link (if GitHub has a homepage), and source link. The five main projects remain manual so their sequence and confidential status never change accidentally. To hide one public repository, add its exact repository name to `excludeRepos`.

## Add an event or achievement

Add an object inside `events`. The events section appears automatically once it has at least one entry.

```js
{
  title: "Event or achievement title",
  date: "October 2026",
  description: "What happened and why it matters.",
  highlights: ["One specific result", "Another useful detail"],
  image: "assets/event-photo.jpg",
  alt: "Describe the photo for screen readers",
  href: "https://event-link.example", // optional source button; use null if there is no link
},
```

Put the event image in the `assets` folder first, then use its relative file path in `image`. The photo itself can be tapped for a small celebration motion; the optional `href` becomes a separate **View event details on Luma** source button, so the evidence page stays easy to open.

For one achievement with two photos, use `images` instead of `image` and `alt`:

```js
images: [
  { src: "assets/event-group.jpg", alt: "Group photo description" },
  { src: "assets/event-winner.jpg", alt: "Winner photo description" },
],
```

The card will keep both photos together in a balanced split image area.

## Add an about photo

Put the new photo in `assets`, then add this object inside `aboutPhotos`:

```js
{
  src: "assets/about-photo.jpg",
  alt: "Describe the photo for screen readers",
  eyebrow: "Small label",
  caption: "A concise caption.",
},
```

## Update the profile rail

The left profile rail stays fixed in one clean panel on desktop. It uses your profile photo, role, country, a compact automatically updating internship duration, experience line, Profile opener, Portfolio route, and résumé download. The live India time card sits in the hero instead. Edit these values near the top of `content/portfolio-data.js`:

```js
profile: {
  heroPhoto: "assets/profile-photo.jpg", // source photo used by profile areas
  profilePhoto: "assets/profile-photo.jpg", // circular photo in the left rail
  linkedinName: "Nitish Kumar · LinkedIn",
  linkedinUrl: "https://www.linkedin.com/in/nitish-ai-engineer",
  connections: "2,254 connections",
  focus: "Generative AI · Agentic AI · RAG",
  role: "AI Engineer & Full-Stack Developer",
  location: "Noida, Uttar Pradesh · India",
  country: "India",
  internshipStartDate: "2026-07-27", // YYYY-MM-DD; the duration updates every month
  internshipDurationMonths: 12, // stop at 12 months for a one-year internship
  internshipTitle: "AI Agentic Intern · private startup team",
  internship: "2 m+ · AI Agentic Intern · private startup team", // fallback only when no start date is set
  experience: "Building confidential multi-agent systems, AI automation, RAG pipelines, API backends, and microservice foundations.",
},
```

The current setup shows compact copy such as `2 m+`, then becomes `3 m+`, `4 m+`, and so on automatically. Change only `internshipStartDate` if your actual joining date differs.

### Update the centre workbench card

The dashboard's centre card is editable in the same `profile` block. It is intentionally local and safe: it does **not** need an API key.

```js
workbenchUpdate: {
  label: "CURRENT BUILD UPDATE",
  title: "Multi-agent systems in progress.",
  detail: "RAG context · reliable APIs · useful product flows",
},
```

The hero has five draggable sticky notes and a fixed centre time card. Their text is currently part of `index.html`. Drag a note by pointer/touch, use arrow keys while it is focused, or use **Reset notes** to return it to the default layout. Do not put a Gemini API key in this public portfolio. If you later want an AI-generated daily update, connect Gemini through a deployed server-side route and keep the key in that host's secret settings.

## Update the résumé

The current download is your original PDF at `assets/nitish-resume.pdf`. It is intentionally independent from the website content.

When you have a new final résumé, replace only that file with the new PDF using the exact same name: `assets/nitish-resume.pdf`. Every Download résumé button will then use the new file automatically after deployment. Do not run the résumé generator or change the PDF from website data unless you explicitly decide to use that workflow later.
