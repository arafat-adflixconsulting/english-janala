const loadLession = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((response) => response.json()) // promise of json data
    .then((json) => displayLesson(json.data));
};
const loadLevelWord = (id) => {
  // load dynamic id
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayLevelWord(data.data));
};
const displayLevelWord = (words) => {
  // 1. get the container and empty
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = " ";
  // 2. get into every word
  for (let word of words) {
    // 3. create element
    const card = document.createElement("div");
    card.innerHTML = `
    <p> Arafat</p>
    `;
    // 4. append into container
    wordContainer.appendChild(card);
  }
};

const displayLesson = (lessons) => {
  // 1. get the container and empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = " ";
  // 2. get into every lessons
  for (let lesson of lessons) {
    // 3. create element
    const btnLesson = document.createElement("div");
    btnLesson.innerHTML = `
            <button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
            </button>
    `;
    // 4. append into container
    levelContainer.appendChild(btnLesson);
  }
};
loadLession();
