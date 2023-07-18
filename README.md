# Moxie

![Moxie-Screenshot-1](screenshots/)

Moxie is a personal dashboard that allows users to track and level up their skills and hobbies. Todo lists can feel neverending, and managing goals is often overwhelming. But with this app, you can build up your weightlifting, woodworking, music, or cooking Moxie by creating a variety of different goals and activities that have constant, real rewards.

This project was created as a Full Stack Capstone project while attending Nashville Software School's Full Stack Web Development Bootcamp. It was completed with one week of planning and 3.5 weeks of coding.

## Table of Contents

- [Moxie](#moxie)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Technologies Used](#technologies-used)
    - [Technologies I had no previous experience with:](#technologies-i-had-no-previous-experience-with)
    - [Why I chose these technologies](#why-i-chose-these-technologies)
  - [Challenges Faced](#challenges-faced)
  - [Current Features](#current-features)
    - [For Authorized Users:](#for-authorized-users)
  - [Possible Future Features](#upcoming-features)
  - [🚧How to Install and Run🚧](#how-to-install-and-run)
  - [Credits](#credits)
  - [Links](#links)

## Project Description

![Moxie-Screenshot-2](screenshots/)

![Moxie-Gif-2](screenshots/)

![Moxie-Gif-3](screenshots/)

This application was built to solve the problem of managing skills and hobbies. Before starting this app, I thought about my process for learning and maintaining different skills and I recognized some  bad patterns: 

- Investing in high caliber equipment too soon.
- Trying something way too challening too quickly.
- Not keeping up with small, continuous practice sessions.
- Getting frustrated by my apparent lack of progress.
- Abondoning or putting aside that skill because 'I'm not where I think I should be.'

Moxie attempts to address these problems, but to do that effectively required building a system of reward. Video games have perfected this system of "do something simple a lot -> gain XP -> XP unlocks new abilities -> new abilities allow taking on tougher challenges -> tougher challenges gain more XP -> Higher XP increases a player's level -> a higher level allows better equipment -> better equipment -> better equipment allows for even tougher challenges -> and it just keeps going. I adopted this system and applied its key principles to real life skills.

## Technologies Used

<a href="https://reactjs.org/" title="React JS"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React JS" width="50px" height="50px"></a>
<a href="https://nextjs.org/" title="NEXT JS"><img src="https://github.com/get-icon/geticon/blob/master/icons/nextjs-icon.svg" alt="NEXTJS" width="50px" height="50px"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"><img src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" alt="JavaScript" width="50px" height="50px"></a>
<a href="https://tailwindcss.com/" title="Tailwind"><img src="https://github.com/get-icon/geticon/raw/master/icons/tailwindcss-icon.svg" alt="Tailwind" width="50px" height="50px"></a>
<a href="https://flowbite.com/" title="Flowbite"><img src="https://flowbite.com/images/logo.svg" alt="Flowbite" width="50px" height="50px"></a>
<a href="https://www.firebase.com/" title="Firebase"><img src="https://github.com/get-icon/geticon/raw/master/icons/firebase.svg" alt="Firebase" width="50px" height="50px"></a>
<a href="https://www.npmjs.com/" title="npm"><img src="https://github.com/get-icon/geticon/raw/master/icons/npm.svg" alt="npm" width="50px" height="50px"></a>
<a href="https://learn.microsoft.com/en-us/dotnet/csharp/" title="C#"><img src="https://github.com/get-icon/geticon/blob/master/icons/c-sharp.svg" alt="C#" width="50px" height="50px"></a>
<a href="https://dotnet.microsoft.com/en-us/" title=".NET"><img src="https://github.com/get-icon/geticon/blob/master/icons/dotnet.svg" alt=".NET" width="50px" height="50px"></a>
<a href="https://www.microsoft.com/en-us/sql-server" title="SQL Server"><img src="https://upload.wikimedia.org/wikipedia/de/thumb/8/8c/Microsoft_SQL_Server_Logo.svg/1200px-Microsoft_SQL_Server_Logo.svg.png" alt="SQL Server" width="50px" height="50px"></a>
<a href="https://swagger.io/" title="Swagger"><img src="https://github.com/get-icon/geticon/blob/master/icons/swagger.svg" alt="Swagger" width="50px" height="50px"></a>
<a href="https://www.postman.com/" title="Postman"><img src="https://github.com/get-icon/geticon/blob/master/icons/postman.svg" alt="Postman" width="50px" height="50px"></a>

### Technologies I had no previous experience with:
- NEXTJS

### Why I chose these technologies

1. I wanted to experiement with NEXTJS and understand how to take advantage of that framework's SSG and SSR features. The ease of Vercel hosting is also a plus.
2. I've used TailwindCSS and flowbite components in other projects. A side goal of mine is to build reusable react components with these technologies as the foundation.
3. This was an ambitious project, and firebase provided an extremely simple setup for handling authentication.
4. C#/.NET/SQL Server are the backend technologies I am most familiar with and using this stack allowed me keep a high velocity in my backend issues.


## Challenges Faced

One challenge I faced was learning some of the patters used with NEXTJS and how best to handle authorized vs. unauthorized routes. My former experience with ReactRouter was very straightfoward for conditionally rendering routes for different user roles/situations. But struggled with implementing similar behaviors with my NEXTJS app where the node server running and delivering the components for each route doesn't necessarily know the exact state of the client side logged in user. I found some patterns that showed a single `<SignIn />` component being rendered in the client to the user in the case that they weren't logged in, the tradeoff being that normal site navigation to routes such as "/" "/faq" "/about" aren't accessible if not signed in. I ended up implementing an imperfect cookies solution instead. 

I think this is an interesting complication of the NEXTJS framework. Consideration for what context a react component is going to be executed in is critical. More research/work is necessary to provide a production ready authorized routing experience. 

## Current Features

### For Authorized Users:

- Users can create a user profile.
- Users can create, add, update, and delete skills.
- Users can manage their own tags that they can use to organize their skills.
- Users can view skill details.

## Upcoming Features

- Deploying Moxie
- Users can feel certain that updates to the app won't break existing features (front end and back end testing implemented)
- Users can create activity logs that generate XP.
- Users can set goals and assign rewards when certain goals are met.
- Users can create specific challenges to try to beat.
- Users can track and improve teqhniques that relate to a skill.
- Users can keep track of gear that they can use for their skills.
- Integrating charts and graphs for a user's skills so a user can track their progress.

# 🚧🚧 This section under construction 🚧🚧 

## How to Install and Run


## Credits

I want to thank everyone in my NSS Cohort that helped me out with this project. The instructors gave me meaningful insight into what would be best to focus on in this application.

## Links

<a href="https://dbdiagram.io/d/6466bacfdca9fb07c45bdc8e" target="_blank">Project ERD</a> || <a href="https://excalidraw.com/#json=oGjPAW7fQ59qyYQycoGZ7,L1nBLzmG_FhC5OPVNGY9Dg" target="_blank">Wireframe</a>
