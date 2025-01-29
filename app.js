"use strict";

const displayProfile = (userProfile, profile) => {
  return (userProfile.innerHTML = `
      <img src="${profile.avatar_url}" id="avatar" class="avatar" />
      <h2 id="name" class="name">${profile.name}</h2>
      <p>Followers: ${profile.followers}</p>
      <p>Following: ${profile.following}</p>
      <a href="${profile.profile_url}" target="_blank" class="profile-link">View Profile</a>
      <a href="${profile.repos_url}" target="_blank" class="profile-link">View Repos</a>
    `);
};

const fetchProfile = async (url) => {
  const username = document.querySelector("#username").value;

  if (!username) {
    alert("Please enter a username");
    return;
  }

  // Show loading indicator
  const userProfile = document.querySelector("#profile");
  userProfile.innerHTML = "Loading...";

  try {
    const res = await fetch(url + username);
    const data = await res.json();

    if (res.status === 404) {
      alert("User not found");
      userProfile.innerHTML = ""; // Clear loading text
      return;
    }

    const profile = {
      avatar_url: data.avatar_url,
      name: data.name || "No name available",
      followers: data.followers,
      following: data.following,
      repos_url: `https://github.com/${data.login}?tab=repositories`,
      profile_url: data.html_url,
    };

    // Display and update the profile section
    userProfile.classList.remove("hidden");
    displayProfile(userProfile, profile);
  } catch (err) {
    console.log(err);
    alert("An error occurred while fetching the profile");
  }
};

const main = () => {
  const button = document.querySelector(".button");
  const url = "https://api.github.com/users/";

  button.addEventListener("click", (e) => {
    e.preventDefault();
    fetchProfile(url);
  });
};

main();
