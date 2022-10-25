## `VidsDrop` is a Video Sharing Social Media Application built with [NextJs](https://nextjs.org/) which is a React framework and powered by [Sanity.io](https://www.sanity.io/docs/overview-introduction) (our database).


### Google Login Using [@react-oauth/google package](https://www.npmjs.com/package/@react-oauth/google).
- On Clicking Google Login button provided from this package, if successful, it returns a response containing the jwt token.
- We decode this token using `jwt-decode` which gives the logged in user details [Refer](components/Login.tsx#L9).
- Then, we send the details to the `/api/auth` route we created [Auth route](/pages/api/auth.ts) where we send the details to sanity which adds this data to the db if it is not already present.

### `Zustand` for Global State Management for storing user [Refer](store/authStore.ts).