# 🛩️Jet Junction

## Usage

Welcome to Jet Junction! Your right hand for quickly and efficiently planning an aircraft's flight plan.

After choosing an aircraft from your fleet, drag available flights to create a draft for tomorrow's itinerary. As you plan, our algorithm will repopulate the All Flights column with appropriate flights, but you still need to choose the best departure time. Pay attention to the subtitle where a percentage is displayed, indicating the usage of the aircraft in 24 hours.

Made a mistake? Just drag a flight back to the All Flights column, or click "Restart" to start from the beginning. If you want to return to the homepage, click on our logo in the header or footer.

Once you are satisfied with your proposed, error-free flight plan, click the "Visualize" button. A colored graph will display: green for flight time, orange for turnaround (20 minutes), and gray for idle. If you're ready to submit your final flight plan, click "Submit" or propose another flight plan with the "Restart" button!

## Built With

* [![Next][Next.js]][Next-url]
* [![TypeScript][TypeScript.js]][TypeScript-url]
* [![React][React.js]][React-url]
* [![Tailwind][Tailwind.js]][Tailwind-url]

Along with the [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) library.

## Getting Started

1) Fork the repository and open the project

2) Navigate into the jet-junction2 folder and run the following commands:

```bash
cd jet-junction2/

npm install
npm run dev
```

3) Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## RoadMap
- [ ] Login Page
- [ ] Home Page
    - [x] Choose an aircraft
    - [ ] Functional header and footer
- [ ] Scheduler
    - [x] Implement dragging
    - [x] Timeline visualization
    - [x] Alerts for invalid flight plan
    - [x] Restart and submit buttons
    - [x] Auto filtering
    - [ ] Instant timeline visualization (without button press)
    - [ ] Graph hover displays flight number
    - [ ] Animate plane on the flight cards
    - [ ] Support back-end post request
- [x] Deploy via Vercel


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind.js]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com
[Typescript.js]: https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Next.js]: https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/