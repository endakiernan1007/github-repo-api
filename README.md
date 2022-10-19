# Github Repo API

API for querying github repos

## Getting Started
- ### Create .env file
  ```
  cp .env.example .env
  ```
  Update GITHUB_TOKEN to your github generated token. API_KEY can be set to whatever you choose, just remember to pass it as the Bearer token (See examples below).

- ### Install Modules
  ```
  npm install
  ```
- ### Run tests
  ```
  npm test
  ```
- ### Start API Server
  ```
  npm start
  ```

## Routes:
- `/repos` -- Fetches info on all open pull requests for a given github url. The url should be passed as an encode URI (encodeURIComponent() for JS). Eg `https://github.com/user/repo` would be written as: `/repo/https%3A%2F%2Fgithub.com%2Fuser%2Frepo`
  
  - Path: `/repos/:url`

  - Method: `GET`

  - Headers: {
    Authorization: Bearer 12345
  }

  - Sample response:
    ```
    {
        "success": true,
        "data": [
            {
                id: 1,
                number: 100,
                title: "Title of Pull Request 1",
                author: "Author of Pull Request 1",
                commit_count: 8
            },
            {
                id: 2,
                number: 101,
                title: "Title of Pull Request 2",
                author: "Author of Pull Request 2",
                commit_count: 4
            }
        ]
    ```
    