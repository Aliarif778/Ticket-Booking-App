let movieSelect = document.querySelector("#movie");
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
let count = document.querySelector(".count");
let total = document.querySelector(".total");

populateUI();

let ticketPrice = +movieSelect.value;

function populateUI() {
  let selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  console.log(selectedSeats);

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  let selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateQtyPrice() {
  let selectedSeats = document.querySelectorAll(".row .seat.selected");
  let seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  count.textContent = selectedSeats.length;
  total.textContent = selectedSeats.length * ticketPrice;
}

movieSelect.addEventListener("change", function (e) {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateQtyPrice();
});

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateQtyPrice();
  }
});
updateQtyPrice();
