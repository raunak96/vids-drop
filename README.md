## `VidsDrop` is a Video Sharing Social Media Application built with [NextJs](https://nextjs.org/) which is a React framework and powered by [Sanity.io](https://www.sanity.io/docs/overview-introduction) (our database).

[![wakatime](https://wakatime.com/badge/user/47f48214-b64a-4e0f-a532-71f1cbbc86bb/project/bdd0ecb1-72cb-451f-bf72-9b3ac6346bd6.svg)](https://wakatime.com/badge/user/47f48214-b64a-4e0f-a532-71f1cbbc86bb/project/bdd0ecb1-72cb-451f-bf72-9b3ac6346bd6)

![App Preview](/public/home-page.JPG)
### Google Login Using [@react-oauth/google package](https://www.npmjs.com/package/@react-oauth/google).
- On Clicking Google Login button provided from this package, if successful, it returns a response containing the jwt token.
- We decode this token using `jwt-decode` which gives the logged in user details [Refer](components/Login.tsx#L9).
- Then, we send the details to the `/api/auth` route we created [Auth route](/pages/api/auth.ts) where we send the details to sanity which adds this data to the db if it is not already present.

### `Zustand` for Global State Management for storing user [Refer](store/authStore.ts).