## Quote App Frontend
This is the frontend for the Quote App, built with React, Tailwind CSS, and Vite. It integrates with a Django REST Framework backend to manage quotes, including creating, editing, deleting, liking, copying, and sharing quotes, as well as user authentication (login, logout, signup, OTP verification). The app features a sleek dark theme with a black background (bg-black), orange shadows (shadow-orange-500), and a gradient header (#8653EF to #B6E63A).
Features

Home Page: Displays all quotes with options to copy, share, like, edit, or delete (edit/delete for owners only).
My Quotes: Shows quotes created by the authenticated user with edit and delete options.
Edit Quote: Allows updating the quote text for owned quotes.
Authentication: Login, logout, and signup with OTP verification, using token-based auth (authToken in localStorage).
Styling: Dark theme with Tailwind CSS, black background, orange accents, and top-right Toastify notifications (success/error).
Responsive: Mobile-friendly with hamburger menu for navigation on smaller screens.

## Tech Stack

React: Frontend framework for building components.
Tailwind CSS: Utility-first CSS for styling.
Vite: Fast build tool and dev server (localhost:5173).
Axios: For API requests to the Django backend (VITE_API_URL).
React Router: For client-side routing (/, /login, /update/:quoteId, /my-quotes).
React Toastify: For notifications (top-right on UpdatePage.jsx, UserQuotes.jsx, Login.jsx; top-center on HomePage.jsx).
React Icons: For icons (copy, share, like, hamburger menu).

## Prerequisites

Node.js: Version 18.x or higher.
npm: Version 8.x or higher.
Django Backend: Running at http://127.0.0.1:8000 (or set VITE_API_URL).
Dependencies: Installed via npm install.

Setup Instructions

Clone the Repository:
git clone <your-repo-url>
cd quote-app-frontend


Install Dependencies:
npm install


Configure Environment:

Create a .env file in the root directory:VITE_API_URL=http://127.0.0.1:8000


Ensure the Django backend is running and CORS is configured to allow localhost:5173.


Run the Development Server:
npm run dev


Open http://localhost:5173 in your browser.


Build for Production:
npm run build


Output is in the dist folder.



File Structure
quote-app-frontend/
├── src/
│   ├── HomePage.jsx         # Lists all quotes with copy, share, like, edit, delete
│   ├── UpdatePage.jsx       # Edit form for updating quote text
│   ├── UserQuotes.jsx       # Lists quotes by authenticated user
│   ├── Login.jsx            # Login form with top-right Toastify
│   ├── Header.jsx           # Navigation with gradient and hamburger menu
│   ├── App.jsx              # Main app with React Router setup
│   └── index.css            # Tailwind CSS imports
├── .env                     # Environment variables (VITE_API_URL)
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── README.md                # This file

Components
HomePage.jsx

Path: /
Features:
Fetches all quotes from /api/quotes/ with authToken (if logged in).
Displays quote text, user, and likes count.
Buttons: Copy (FaCopy), Share (FaShareFromSquare), Like (FaHeart), Edit/Delete (if is_owner: true).
Edit navigates to /update/:quoteId.
Toasts: Top-center, dark theme.


API Endpoints:
GET /api/quotes/
POST /api/quotes/<id>/like/
DELETE /api/quotes/<id>/delete/



UpdatePage.jsx 

Path: /update/:quoteId
Features:
Fetches quote data from /api/quotes/<id>/ on load.
Form to update quote text (max 500 chars).
Buttons: Update (bg-yellow-500), Cancel (bg-gray-500).
Redirects to /login if not authenticated.
Toasts: Top-right, dark theme, handles 401 (unauthorized), 403 (not owner), 404 (not found), 400 (validation errors).


API Endpoints:
GET /api/quotes/<id>/
PUT /api/quotes/<id>/update/



Profile.jsx 

Path: /profile
Features:
Fetches user’s quotes from /api/quotes/user/ with authToken.
Displays user’s quotes with copy, share, edit, and delete buttons.
Redirects to /login if not authenticated.
Toasts: Top-right, dark theme.


API Endpoints:
GET /api/quotes/user/
DELETE /api/quotes/<id>/delete/



Login.jsx 

Path: /login
Features:
Form for username and password.
Sets authToken in localStorage on successful login.
Toasts: Top-right, dark theme.


API Endpoint:
POST /api/auth/login/



Header.jsx

Features:
Gradient header (#8653EF to #B6E63A).
Links: Home (/), My Quotes (/my-quotes), Profile (/profile), Login (/login), Signup (/register), Logout.
Hamburger menu (GiHamburgerMenu) for mobile.
Logout clears authToken and redirects to /.



Styling

Theme: Black background (bg-black), white text, orange shadows (shadow-orange-500).
Buttons:
Copy: Blue (bg-blue-500, hover:bg-blue-600).
Share: Green (bg-green-500, hover:bg-green-600).
Like: Gray (bg-gray-500, hover:bg-gray-600), red heart when liked (text-red-500).
Edit: Yellow (bg-yellow-500, hover:bg-yellow-600).
Delete: Red (bg-red-500, hover:bg-red-600).
Cancel: Gray (bg-gray-500, hover:bg-gray-600).


Header: Gradient (from-[#8653EF] to-[#B6E63A]).
Toasts:
HomePage.jsx: Top-center, dark theme.
UpdatePage.jsx, UserQuotes.jsx, Login.jsx: Top-right, dark theme.



Usage

Login:
Go to /login, enter username and password.
On success, authToken is stored in localStorage, and you’re redirected to /.


View Quotes:
Go to / to see all quotes.
Copy, share, or like any quote.
If logged in and is_owner: true, edit/delete buttons appear.


Edit Quote:
Click Edit on a quote you own, navigate to /update/:quoteId.
Update the text, submit, and return to /.


View Your Quotes:
Go to /my-quotes to see your quotes.
Copy, share, edit, or delete your quotes.


Logout:
Click Logout in the header to clear authToken and redirect to /.



API Endpoints (Backend)

GET /api/quotes/: List all quotes.
GET /api/quotes/<id>/: Get a single quote.
POST /api/quotes/create/: Create a quote (requires authToken).
PUT /api/quotes/<id>/update/: Update a quote (requires authToken, owner only).
DELETE /api/quotes/<id>/delete/: Delete a quote (requires authToken, owner only).
POST /api/quotes/<id>/like/: Like/unlike a quote (requires authToken).
GET /api/quotes/user/: List quotes by authenticated user (requires authToken).
POST /api/auth/login/: Login and get authToken.
POST /api/account/logout/: Logout (requires authToken).
GET /api/user-info/: Get user info (requires authToken).

Debugging

Check authToken:
Open dev tools (F12) > Application > Local Storage.
Verify authToken exists.
If missing, log in via /login.


Test API:
Fetch quote:curl -H "Authorization: Token <your-authToken>" http://127.0.0.1:8000/api/quotes/<quote-id>/


Update quote:curl -X PUT -H "Authorization: Token <your-authToken>" -H "Content-Type: application/json" -d '{"text": "Updated quote"}' http://127.0.0.1:8000/api/quotes/<quote-id>/update/


User quotes:curl -H "Authorization: Token <your-authToken>" http://127.0.0.1:8000/api/quotes/user/




Check Logs:
Console: Look for Quote data, User quotes data, Quotes API response, or errors (error.response?.data).
Django: Run python manage.py runserver and check for is_owner check, Update attempt, Fetching quotes for user.


Fix Issues:
If edit fails (400), check error.response?.data for validation errors.
If 403, verify is_owner: true in /api/quotes/<id>/.
If 401, delete token in Django admin (/admin/authtoken/token/) and log in.
If /my-quotes is empty, create a quote via /api/quotes/create/.



Known Issues

Like Button: HomePage.jsx uses localStorage.getItem("token") instead of "authToken". Fix by updating to localStorage.getItem("authToken") when addressing the like feature.
Share URL: Placeholder (/quote/<id>). Implement SingleQuote.jsx for a dedicated quote view if needed.

Future Improvements

Add a create quote page (/create) to POST to /api/quotes/create/.
Implement a single quote view (/quote/:id) for sharing.
Add orange-accented toasts (e.g., border-orange-500) for consistency.
Enhance mobile responsiveness for long quotes.
Add loading states for API calls.

Contributing

Submit pull requests to <your-repo-url>.
Report issues via the repository’s issue tracker.
Ensure code follows Tailwind conventions and includes console logs for debugging.

License
MIT License. See LICENSE for details.