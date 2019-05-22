var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
var prefix = "https://cors-anywhere.herokuapp.com/";

function getQuote() {
  fetch(prefix + quoteUrl, { cache: "no-store" })
    .then(function(resp) {
      return resp.json();
    })
    .then(createTweet)
    .catch(function(error) {
      console.log(error.message);
    });
}
//{ cache: "no-store" } — stosujemy to, aby wyłączyć możliwość zaglądania do HTTP Cache przez przeglądarkę. Innym słowy — chcemy, aby przeglądarka za każdym razem pytała podany URL o dane.
function createTweet(input) {
  var data = input[0];

  var dataElement = document.createElement('div');
  dataElement.innerHTML = data.content;
  console.log(data.content);
  var quoteText = dataElement.innerText.trim();
  var quoteAuthor = data.title;

  if(!quoteAuthor.length) {
    quoteAuthor = "Unknown author";
  }

  var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
  if(tweetText.length > 140) {
    getQuote();
  } else {
    var tweet = tweetLink + encodeURIComponent(tweetText);
    document.querySelector('.quote').innerText = quoteText;
    document.querySelector('.author').innerText = quoteAuthor;
    document.querySelector('.tweet').setAttribute('href', tweet);

  }
}

document.addEventListener('DOMContentLoaded', function() {
  getQuote();
  console.log('getQuote');
  document.querySelector('.trigger').addEventListener('click', function() {
    getQuote();
    console.log('trigger getQuote');
  });
});
