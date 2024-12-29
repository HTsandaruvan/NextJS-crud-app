// import ky from "ky";
import { api } from "../api";

export const loginUser = async (loginData) => {
  // console.log(loginData);
  const response = await fetch("http://localhost:3000/api/v1/login", {
    method: "POST",
    body: JSON.stringify({
      email: loginData?.email,
      password: loginData?.password,
    }),
  });

  console.log("LOGIN ACTION", response.json());
};

export const getMovies = async () => {
  try {
    const response = await api.get("movies", {
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("API Response:", data);
      return data;
    } else {
      console.log("Error response:", response);
      return { error: true, message: "Something went wrong!" };
    }
  } catch (error) {
    console.log("Error fetching movies:", error);
    return undefined;
  }
};
