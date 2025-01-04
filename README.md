# Candidate Search Application

## Description

The Candidate Search Application is a React-based web application that allows users to browse, review, and save potential candidates fetched from a GitHub-like API. The app provides an intuitive interface for managing candidates, ensuring a seamless user experience with data persistence across sessions.

## Table of Contents
1. [Features](#features)
2. Installation
3. Usage
4. License
5. Github
6. Email

---

## Features
- View detailed information about candidates, including:
    - Name
    - Username
    - Location
    - Avatar
    - Email
    - Profile URL
    - Company
- Save potential candidates to a list.
- Skip candidates without saving.
- View all saved candidates on a separate page.
- Persist data across sessions using localStorage.
- Display appropriate messages when no candidates are available or saved.


### Candidate Search Page
- **Initial Display**: On loading, the first candidate's details are displayed, including:
  - Name
  - Username
  - Location
  - Avatar
  - Email
  - HTML URL (profile link)
  - Company
- **Save Candidate**: Clicking the **"+" button** saves the current candidate to the list of potential candidates and displays the next candidate.
- **Skip Candidate**: Clicking the **"- button** skips the current candidate and displays the next candidate without saving.
- **No Candidates Left**: When no more candidates are available for review, an appropriate message is displayed.

## Installation
Follow these steps to install and set up the application
1. Clone the repository: 
    ```bash
    git clone https://github.com/your-username/candidate-search.git
    cd candidate-search
2. Install dependencies
    ```bash
    npm install
3. Start the development server
    ```bash
    npm start
4. Access the application
    - Open the application in your browser at http://localhost:3000

## Usage

1. Candidate Search Page:
    - Load the page to view the first candidate's details.
    - Use the "+" button to save a candidate and view the next one.
    - Use the "- button to skip a candidate and view the next one.
    - When all candidates have been reviewed, a message will appear indicating no more candidates are available.
2. Saved Candidates Page:
    - Navigate to the "Saved Candidates" page to view the list of saved candidates.
    - If no candidates are saved, an appropriate message will indicate the list is empty.
    - Saved candidates persist across sessions.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Github
github.com/aangus98

## Email
mrangus298@gmail.com
