const form = document.querySelector("#searchForm");
const container = document.querySelector(".row");

const searchBtn = document.querySelector("#button-addon2");
var illImg = document.querySelector("#illImg");

searchBtn.addEventListener("click", function () {
  container.innerHTML = "";
  illImg.style.display = "none";
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.tvShows.value;
  const res = await axios.get(
    ` https://api.tvmaze.com/search/shows?q=${searchTerm}`
  );
  console.log(res.data);
  showResults(res.data);
  form.elements.tvShows.value = "";
});

var showResults = (shows) => {
  for (const result of shows) {
    if (result.show.image) {
      var text = result.show.summary;

      var defaultText;

      var textInfo = ` ...more`;
      console.log(text.length);
      if (text.length > 250) {
        for (let index = 0; index < 240; index++) {
          defaultText = defaultText + text[index];
        }
        defaultText += `<a> ...more</a>`;
      } else {
        defaultText = text;
      }

      var card = document.createRange().createContextualFragment(
        `<div class="col-sm-4 mt-4 p-2 ">
          <div class="card h-100 ">
            <img
              src="${result.show.image.medium}"
              class="card-img-top"
              alt="${result.show.name}Img"
            />
            <div class="card-body" style=" min-height:144px" >
              <h5 class="card-title">${result.show.name}</h5>
                <p class="card-text"  id="summary" >${defaultText}</p>
            </div>
          </div>
        </div>`
      );
      container.appendChild(card);

      defaultText = "";
    }
  }
};
