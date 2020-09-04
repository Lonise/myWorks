const popup = document.querySelector(".popup");

let users;

function loadUsers() {
  const xhr = new XMLHttpRequest();

  const httpRequestStatuses = {
    success: 200
    };

    const
        answerStats = {
            answer: 4
        };
  xhr.onreadystatechange = function() {
      if (xhr.readyState === answerStats.answer && xhr.status === httpRequestStatuses.success) {
      const responseJson = JSON.parse(xhr.responseText);
      users = responseJson.results;
      renderUsers(users);
    }
  };

  xhr.open(
    "GET",
    "https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture",
    true
  );

  xhr.send();
}

function renderUsers(users) {
  const container = document.getElementById("users-container");
  container.innerHTML = "";

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    const {
      name: { title, first, last },
        picture,
        location: { street, city, state },
        email, phone
    } = user;

    const { medium, large } = picture;

    const userCard = document.createElement("div");
    userCard.innerText = `${title} ${first} ${last}`;
    userCard.className = "user-card";

    const photo = document.createElement("img");
    photo.setAttribute("class", "user-card-photo");
    photo.setAttribute("src", medium);

    userCard.appendChild(photo);

    userCard.onclick = () => {
      const photo = document.createElement("img");
      photo.setAttribute("class", "user-profile-photo");
      photo.setAttribute("src", large);

      const popupContent = popup.querySelector(".popup-content");
      popupContent.innerHTML = "";
      popupContent.appendChild(photo);
      
      const popupInfo = popup.querySelector(".popup-info");
        popupInfo.innerHTML = `${title}  ${first} ${last} <br> ${street} <br> ${city} <br> ${state} <br> ${email} <br> ${phone}`;
      openPopup();

    };

    container.appendChild(userCard);
  }
}

function openPopup() {
  popup.style.display = "block";
}

function closePopup() {
  popup.style.display = "none";
}

function sortUsersAsc() {
  bubbleSort(
    users,
    (user1, user2) =>
      user1.name.first.toUpperCase() < user2.name.first.toUpperCase()
  );
  renderUsers(users);
}

function sortUsersDesc() {
  bubbleSort(
    users,
    (user1, user2) =>
      user1.name.first.toUpperCase() > user2.name.first.toUpperCase()
  );
  renderUsers(users);
}

function bubbleSort(array, compare) {
  var swapped;
  do {
    swapped = false;
    for (var i = 0; i < array.length - 1; i++) {
      if (compare(array[i], array[i + 1])) {
        var temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
}
