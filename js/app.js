let time = document.getElementById("time");
let name = localStorage.getItem("Name");
let embedCode = localStorage.getItem("Embed");

let quotes = [
  {
    quote: "The Way Get Started Is To Quit Talking And Begin Doing.",
    author: "Walt Disney"
  },
  {
    quote:
      "The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty.",
    author: "Winston Churchill"
  },
  {
    quote: "Don’t Let Yesterday Take Up Too Much Of Today",
    author: "Will Rogers"
  },
  {
    quote: "It’s Not Whether You Get Knocked Down, It’s Whether You Get Up.",
    author: "Vince Lombardi"
  },
  {
    quote:
      "If You Are Working On Something That You Really Care About, You Don’t Have To Be Pushed. The Vision Pulls You.",
    author: "Steve Jobs"
  },
  {
    quote:
      "People Who Are Crazy Enough To Think They Can Change The World, Are The Ones Who Do.",
    author: "Rob Siltanen"
  },
  {
    quote: "We May Encounter Many Defeats But We Must Not Be Defeated.",
    author: "Maya Angelou"
  },
  {
    quote:
      "Knowing Is Not Enough; We Must Apply. Wishing Is Not Enough; We Must Do.",
    author: "Johann Wolfgang Von Goethe"
  },
  {
    quote:
      "Imagine Your Life Is Perfect In Every Respect; What Would It Look Like?",
    author: "Brian Tracy"
  },
  {
    quote:
      "Security Is Mostly A Superstition. Life Is Either A Daring Adventure Or Nothing.",
    author: " Helen Keller"
  }
];

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  const amPm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  time.innerHTML = `${hour}:${addZero(min)}:${addZero(sec)} ${amPm}`;

  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

function greet() {
  let hour = new Date().getHours();
  if (hour >= 6 && hour < 12) {
    document.getElementById("greeting").innerHTML = `Good Morning, ${name}`;
  } else if (hour == 12 || hour > 23) {
    document.getElementById(
      "greeting"
    ).innerHTML = "Have A Good Day, Hassan"`Good Morning, ${name}`;
  } else if (hour > 12 && hour < 17) {
    document.getElementById("greeting").innerHTML = `Good Afternoon, ${name}`;
  } else if (hour >= 17 && hour < 20) {
    document.getElementById("greeting").innerHTML = `Good Evening, ${name}`;
  } else {
    document.getElementById("greeting").innerHTML = `Good Night, ${name}`;
  }
}

function addQuote() {
  let date = new Date().getDate();
  let index = date <= 10 ? date : date % 10;
  let quote = quotes[index - 1].quote;
  let author = quotes[index - 1].author;
  document.getElementById("quote").innerHTML = `${quote}<br/>- ${author}`;
}

function changeState() {
  setTimeout(showPage, 1000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("home").style.display = "block";
  document.querySelector(".container").style.display = "block";
}

function setValues(user = name, code = embedCode) {
  if (localStorage.getItem("Name") == null) {
    _default = "Sir";
    localStorage.setItem("Name", _default);
    name = _default;
  } else {
    name = user;
  }
  if (localStorage.getItem("Embed") == null) {
    _default = `<iframe
    class="music-content"
    width="39%"
    height="500"
    scrolling="no"
    frameborder="no"
    allow="autoplay"
    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/216928925/favorites&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
    ></iframe>`;
    localStorage.setItem("Embed", _default);
    embedCode = _default;
  } else {
    embedCode = code;
  }
}

function getSettings(e) {
  let inputName = prompt("Enter your name: ");
  let soundCloudEmbed = prompt("Enter a valid soundcloud embed snippet: ");

  if (inputName != "" && inputName != null) {
    localStorage.setItem("Name", inputName);
    setValues(inputName, embedCode);
    greet();
  }
  if (soundCloudEmbed != "" && soundCloudEmbed != null) {
    let _class = soundCloudEmbed.slice(0, 8);
    _class += `class='music-content' width="39%" height="500"`;
    soundCloudEmbed = soundCloudEmbed.slice(33);
    soundCloudEmbed = `${_class} ${soundCloudEmbed}`;
    localStorage.setItem("Embed", soundCloudEmbed);
    setValues(name, soundCloudEmbed);
    addSoundCloud();
  }
}

function addSoundCloud() {
  document.getElementById("music").innerHTML += embedCode;
}

$(document).on("click", ".setting", getSettings);

document.body.onload = function() {
  changeState();
};

setValues();
addSoundCloud();
showTime();
greet();
addQuote();
