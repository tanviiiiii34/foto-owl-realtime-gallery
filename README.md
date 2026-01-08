Foto Owl – Real-Time Image Gallery

1. What This Project Is About
The main goal of the application is to allow multiple users to view a shared image gallery and interact with images using emoji reactions and comments. All interactions are synchronized in real time, meaning actions performed by one user are instantly visible to others without refreshing the page.

Images are fetched dynamically from the Unsplash API and displayed in a clean, scrollable gallery layout.

 2. Tech Stack Used

- React (Functional Components)
- Vite
- Tailwind CSS
- InstantDB (Real-time data synchronization)
- Unsplash API
- Local Storage (basic user identity)
- Vercel (deployment)

 3. Key Features

Image Gallery
The homepage displays a grid of high-quality images fetched from the Unsplash API.  
Images load smoothly and are arranged in a responsive, scrollable layout.
Clicking on any image opens a focused modal view where users can interact with that specific image.

Real-Time Emoji Reactions
Each image supports emoji reactions.
- Users can react using emojis such as heart, laugh, and surprise
- Reaction counts update in real time across all open tabs and users
- No authentication is required
- Every reaction is stored and synced using InstantDB
This ensures that if multiple users are viewing the same image, everyone sees the same reaction count instantly.


Real-Time Comments
Users can add comments to any image from the modal view.
- Comments appear instantly for all connected users
- The comment input is controlled and updates smoothly
- Each comment is tied to a specific image
- Real-time synchronization is handled entirely by InstantDB
This makes the interaction feel collaborative, similar to modern social platforms.


Live Feed (Global Activity)
The application includes a real-time feed section that shows activity happening across all images.
Examples of feed updates include:
- A user reacting to an image
- A new comment being added
The feed updates immediately when any interaction occurs, allowing users to see activity even when they are not viewing the same image.


Basic User Identity
To avoid complex authentication, the app generates a simple user identity using local storage.
This identity is used to:
- Distinguish user actions
- Keep interaction behavior consistent across sessions


4. Why This Project Matters
This project demonstrates:
- Real-time data synchronization across multiple users
- Practical use of a real-time database (InstantDB)
- Clean separation of React components (Gallery, Modal, Feed)
- Handling async data from third-party APIs
- Managing shared state without traditional authentication
Rather than focusing only on visuals, the project emphasizes correctness, real-time behavior, and clarity.


 5. User Flow Summary

1. User opens the application
2. Images load automatically from Unsplash
3. User clicks an image to open it in a modal
4. User reacts with emojis or adds comments
5. Reactions and comments update instantly for all users
6. Feed section reflects all interactions in real time



6. Setup Instructions

### Clone the repository
```bash
git clone https://github.com/<your-username>/foto-owl-realtime-gallery.git
cd foto-owl-realtime-gallery
