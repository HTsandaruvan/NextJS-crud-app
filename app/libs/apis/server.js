export const loginUser = async (loginData) => {
  // console.log(loginData);
  const response = await fetch("http://localhost:3001/api/v1/login/", {
    method: "POST",
    body: JSON.stringify({
      email: loginData?.email,
      password: loginData?.password,
    }),
  });

  console.log("LOGIN ACTION", response.json());
};
