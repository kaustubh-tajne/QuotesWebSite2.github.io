const quotes = document.getElementById('quotes');
const author = document.getElementById('author');
const btn = document.getElementById('btn');
let tweet = document.getElementById('tweet');
let tweetNew = document.getElementsByClassName('tweetNew');
let sorted = document.getElementById('sorted');
let realData = '';
let quotesData = '';


const getNewQuotes = () => {
    let rnum = Math.floor(Math.random() * 1640);
    // console.log(rnum);
    quotesData = realData[rnum];
    quotes.innerText = `${quotesData.text}`;
    author.innerText = (quotesData.author != null) ? `${quotesData.author}` : 'Unkwon';
}

const getQuotes = async () => {
    const api = 'https://type.fit/api/quotes';
    try {
        let data = await fetch(api);
        realData = await data.json();

        console.log(realData.length);
        getNewQuotes();

    } catch (error) {

    }
}

const tweetMe = () => {
    let tweetPost = `https://twitter.com/intent/tweet?text="${quotesData.text}"${' Author : ' + quotesData.author}`;
    window.open(tweetPost);
}
tweet.addEventListener('click', tweetMe);

btn.addEventListener('click', getNewQuotes);

getQuotes();


const show = () => {
    setTimeout(() => {
        let card = '';
        realData.forEach((element, index) => {
            card += `<div class="card my-2 mainCard">
                        <div class="card-header">
                            Quote
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p id=${'text' + index}>${element.text}</p>
                                <footer class="blockquote-footer">Author :  <cite title="Source Title" id=${'author' + index}>${(element.author != null) ? `${element.author}` : 'Unkwon'}</cite></footer>
                            </blockquote>
                        </div>
                        <div class="buttonsNew">                        
                            <button type="button" id ="tweetNew" class ="tweetNew"><img src="./images/twitter.png" alt="Click For Tweet"></button>
                        </div>
                    </div>`;
        });
        sorted.innerHTML = card;
        document.getElementsByClassName('mainCard').style.display = 'none';
        Array.from(document.getElementsByClassName("tweetNew")).forEach(function (element, index) {
            element.addEventListener('click', (ele) => {
                let text = document.getElementById(`${'text' + index}`);
                let author = document.getElementById(`${'author' + index}`);

                let tweetPost = `https://twitter.com/intent/tweet?text="${text.innerText}"${' Author : ' + author.innerText}`;
                window.open(tweetPost);
            })
        });


    }, 1000);
    sorted.innerHTML = `<h1>Fetching</h1>`;

}
// search
show();


let search = document.getElementById('searchText');
search.addEventListener('input', () => {
    let inputVal = search.value.toLowerCase();
    let mainCard = document.getElementsByClassName("mainCard");

    Array.from(mainCard).forEach(function (element) {
        let text = element.getElementsByTagName("p")[0].innerText;
        let author = element.getElementsByTagName("cite")[0].innerText;

        if (text.toLowerCase().includes(inputVal) || author.toLowerCase().includes(inputVal)) {
            element.style.display = "block";
        }
    });
})

