// import axios from "axios";

// export const fetchTestToken = async () => {
//   try {
//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZvdW5kZXJAZmx5ZmFybGFkaWVzLmNvbSIsImlkIjoiYTJlOTE1YjM5NjE3NDllNThlYzc3YjcxYjk1YWIwNWUiLCJpYXQiOjE3MDE2ODU3NTB9.V7waghuYioEHX7Dm0tkkZCYraROPTRbUwk0g5WlA5rA";
//     const response = await axios.get(
//       "https://quickticketsb2b-nodejs.de.r.appspot.com/api/v1/api_agent/get_access_token",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     // Handle error
//     console.error(error.response.data.message);
//     return error.response.data.message;
//   }
// };
