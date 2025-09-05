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

  if (words.length == 0) {
    wordContainer.innerHTML = `
      <div class="text-center col-span-full font-bangla">
      <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-xl font-medium text-gray-400 rounded-xl py-10 space-y-6">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
    
    `;
    return;
  }

  // 2. get into every word

  //   {
  //     "id": 102,
  //     "level": 2,
  //     "word": "Night",
  //     "meaning": "রাত্রি",
  //     "pronunciation": "নাইট"
  // }

  for (let word of words) {
    console.log(word);
    // 3. create element
    const card = document.createElement("div");
    card.innerHTML = `
    <div
        class="bg-white rounded-xl shadow-sm text-center py-15 px-5 space-y-4"
      >
        <h2 class="font-bold text-2xl">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-semibold font-bangla">"${
          word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
        } / ${
      word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"
    }"</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
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
