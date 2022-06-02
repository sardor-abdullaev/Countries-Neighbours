"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
const renderCountry = function (data, className = "") {
  const currency = Object.values(data[0].currencies)[0].name;
  const flag = data[0].flags.svg;
  const coat = data[0].coatOfArms.svg;
  const name = data[0].name.common;
  const region = data[0].region;
  const population = (+data[0].population / 1000000).toFixed(1);
  const language = Object.values(data[0].languages);
  const area = data[0].area;
  // console.log(language);
  const html = `
        <article class="country ${className}">
              <img class="country__img" src="${flag}" />
              <img class="country__flagcoat" src="${coat}" />
              
              <div class="country__data">
                <h3 class="country__name">${name}</h3>
                <h4 class="country__region">${region}</h4>
                <p class="country__row"><span>👫</span>${population} mln people</p>
                <p class="country__row"><span>🗺</span>${area} km<sup>2</sup></p>
                <p class="country__row"><span>🗣️</span>${language}
                </p>
  <p class="country__row"><span>💰</span>${currency}</p>
              </div >
            </article >
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // fetch country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      // render country
      if (data.status == "404") throw Error("Not found such a country!");
      renderCountry(data);
      // get neighbour country(2)
      const neighbour = data[0].borders;
      if (!neighbour) return;
      neighbour.forEach((neigh) => {
        fetch(`https://restcountries.com/v3.1/alpha/${neigh}`)
          .then((response) => response.json())
          .then((data2) => {
            // render country 2
            renderCountry(data2, "neighbour");
          });
      });
    })
    .catch((e) => alert(e));
};

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then((pos) => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then((res) => {
//       console.log(res);
//       if (!res.ok) {
//         alert(`Problem with geocoding ${res.status}`);
//         return res.json();
//       }
//     })
//     .then((data) => {
//       // alert(`You are in ${data.city},${data.country}`);
//       console.log(data);
//       getCountryAndNeighbour(data.country);
//     });
// };
// whereAmI();

// fetch("https://geocode.xyz/19.037,72.873?geoit=json")
//   .then((response) => response.json())
//   .then((json) => console.log(json));

// getCountryAndNeighbour('usa');
// getCountryAndNeighbour("russia");
// getCountryAndNeighbour('China');
// getCountryAndNeighbour('germany');
let country = prompt("Please enter any country", "Uzbekistan");
getCountryAndNeighbour(country);

// AIzaSyDWqAInEGOQQr36MjggX5Iet2XyBQkr_r4
