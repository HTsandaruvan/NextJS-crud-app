// import ky from "ky";
import { api } from "../api";
require("dotenv").config();

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

export const registerUser = async (formData) => {
  try {
    const response = await api.post("register", { json: formData });
    // console.log("Registraion response :", response);
    if (response.ok) {
      return response.json();
    } else {
      return undefined;
    }
    //console.log("Form data", formData);
  } catch (error) {
    const status = error.response.status;
    const responseBody = await error.response.json();
    if (status && responseBody) {
      if (status === 409) {
        return responseBody;
      }
      return undefined;
    }
    return undefined;
  }
};

export const getMovies = async () => {
  try {
    const response = await api.get("v1/movies", {
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
