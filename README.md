#Glass Morphism Digital Clock & Calendar

A modern digital clock with a glass morphism interface that shows the current time in real time, along with a personal calendar where users can save their own events, tasks and notes. Built with plain HTML, CSS and JavaScript, with no frameworks or libraries.

Project Overview
Design a modern digital clock with a glass morphism interface that displays the current time dynamically and provides an attractive responsive user experience.
Web Development Role: Real-time time updates, CSS glass morphism effects, responsive layout, styling, and JavaScript-based dynamic content.
Skills: HTML · CSS · JavaScript · DOM Manipulation · CSS Effects · Responsive Design
Incorporates frosted glass effects with backdrop-filter, analog second-hand rotation, and a 12h/24h toggle.
Features
Clock page (index.html)
Live digital time that updates every second
Current date shown in full (weekday, day, month, year)
Analog clock with hour, minute and second hands that rotate in real time
12-hour / 24-hour format toggle (AM/PM shown in 12-hour mode)
Frosted glass card using backdrop-filter: blur()
Responsive layout for desktop, tablet and mobile
Calendar page (calendar.html)
Full month view with previous / next month navigation
Today is highlighted, and "Go to Today" jumps back to the current date
Click any date to see and manage its details
Add an Event, Task or Note with a title and optional time
Mark items as done, or delete them
Dates that have saved items show a small dot
All data is saved by the user in the browser using localStorage, so it is still there after a refresh
Technologies Used
Technology	Used for
HTML5	Page structure, form, links between pages
CSS3	Glass morphism, flexbox, grid, animation, media queries
JavaScript (ES5/ES6)	Date object, DOM manipulation, events, setInterval, localStorage
Project Structure
glass-clock/
├── index.html       # Clock page
├── style.css        # Clock page styling
├── script.js        # Clock logic (time, hands, 12h/24h toggle)
├── calendar.html    # Calendar page
├── calendar.css     # Calendar page styling
├── calendar.js      # Calendar logic (dates, items, saving data)
└── README.md
How to Run
Download or clone this repository:
bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
Open the glass-clock folder.
Double-click index.html to open it in your browser. No installation or server is needed.
Click Open Calendar to go to the calendar page.
How It Works
Time updates: script.js reads the time with new Date() and setInterval repeats it every 1 second.
Analog hands: each hand is rotated with CSS transform: rotate(). The angle is calculated as 6° per second, 6° per minute and 30° per hour.
Glass effect: a semi-transparent white background with backdrop-filter: blur() and a light border, placed over colorful blurred circles.
Saved data: calendar items are stored as JSON in localStorage under the key myGlassCalendar.
Note

Calendar data is stored only in the user's own browser and device. It is not shared between devices, and clearing the browser data will remove it.

Future Improvements
Dark / light theme switch
Edit saved items
Reminders and notifications
Backend (for example Spring Boot + MySQL) to sync data across devices
Author

Abhishek Choure
