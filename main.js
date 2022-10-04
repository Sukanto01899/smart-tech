//Spiner
const showSpin = (ev)=>{
    const spiner = document.getElementById('spiner');
    spiner.style.display = ev
}

//Get search text
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    showSpin('block')
    const searchText = document.getElementById('search-text');
    getData(searchText.value);
    searchText.value = '';
})
//Fetch api & send data to a function
const getData = async (searchText)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    showSearchResult(data);
}
//Show result on UI
const showSearchResult = data => {
    const phoneResultBox = document.getElementById('phone-result');
    phoneResultBox.textContent = ''
    for(const phone of data.data){ //loop
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('card');
         mainDiv.innerHTML = `
         <div class="img">
                <img src="${phone.image}" alt="">
                <span>${phone.brand}</span>
            </div>
           <div class="card-body">
            <h4>${phone.phone_name}</h4>
            <button>Details</button>
           </div>`

           phoneResultBox.appendChild(mainDiv)
    }
    showSpin('none')
}