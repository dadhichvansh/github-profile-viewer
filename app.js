"use strict";

const button = document.querySelector(".button");
const url = "https://api.github.com/users/";

button.addEventListener("click", async (e) => {
  e.preventDefault();

  const username = document.querySelector("#username");
  console.log(username.value);
  const res = await fetch(`url/${username}`);
  console.log(res);
  const data = await res.json();
});
