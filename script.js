const apiKey = "699cd21960884b6d9125d43f77abcef4"

const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;


        const response = await fetch(apiUrl)

        const data = await response.json()
        return data.articles;

    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

searchBtn.addEventListener("click", search);
searchField.addEventListener("keydown", async (event)=> {
    if(event.key == "Enter") search();
})

async function search() {
    const query = searchField.value;

    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.error("Error fetching news by query", error)
        }
    }
}

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`

        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news by query", error)
        return []
    }
}


function displayBlogs(articles) {
    blogContainer.innerHTML = ""
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card")
        const img = document.createElement("img")
        img.src = article.urlToImage
        img.alt = article.title

        const title = document.createElement("h2")
        const truncatedTitle = article.title.length > 45 ? article.title.slice(0, 45) + "..." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p")
        const truncatedDesc = article.description.length > 120 ? article.description.slice(0, 120) + "..." : article.description;
        // description.textContent = article.description;
        description.textContent = truncatedDesc;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank")
        })

        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
