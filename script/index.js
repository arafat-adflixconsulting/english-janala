const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class = "btn">${el}</span>`);
  return htmlElements.join(" ");
};

// const manageSpinner = (status) => {
//   if (status == true) {
//     Document.getElementById("spinner").classList.remove("hidden");
//     Document.getElementById("word-container").classList.add("hidden");
//   } else {
//     Document.getElementById("word-container").classList.remove("hidden");
//     Document.getElementById("spinner").classList.add("hidden");
//   }
// };

const loadLession = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((response) => response.json()) // promise of json data
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessionButton = document.querySelectorAll(".lesson-btn");
  // console.log(lessionButton);
  lessionButton.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  // manageSpinner(true);
  // load dynamic id
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      removeActive(); // remove all active class
      const clickBtn = document.getElementById(`btn-lesson-${id}`);
      // console.log(clickBtn);
      clickBtn.classList.add("active"); // active class added
      displayLevelWord(data.data);
    });
};

//   {
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস",
//     "level": 2,
//     "sentence": "Be cautious while crossing the road.",
//     "points": 2,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "careful",
//         "alert",
//         "watchful"
//     ],
//     "id": 3
// }

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const response = await fetch(url);
  const details = await response.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");

  detailsBox.innerHTML = `
  <div class="">
            <h2 class="text-2xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${
    word.pronunciation
  })
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
           <div class=""> ${createElements(word.synonyms)}
           
           </div>
          </div>
  `;
  document.getElementById("word_modal").showModal();
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
    // console.log(word);
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
          <button onclick="loadWordDetails(${
            word.id
          })" class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]">
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
  // manageSpinner(false);
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
            <button id = "btn-lesson-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
            </button>
    `;
    // 4. append into container
    levelContainer.appendChild(btnLesson);
  }
};
loadLession();
