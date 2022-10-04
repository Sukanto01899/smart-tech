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

    if(data.data.length === 0){
        console.log('not found')
    }
    else if(data.data.length > 20){
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
                <button onclick="fetchSlug('${phone.slug}')">Details</button>
               </div>`
    
               phoneResultBox.appendChild(mainDiv);
        }
    }
    else{
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
                <button onclick="fetchSlug('${phone.slug}')">Details</button>
               </div>`
    
               phoneResultBox.appendChild(mainDiv);
        }
    }
    
    showSpin('none')
}

const fetchSlug = async (slug)=>{
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    const res = await fetch(url);
    const data = await res.json();
    showDetails(data)
}

const showDetails = data =>{
    console.log(data)
    const phoneDetails = document.getElementById('phone-details');
    const detailsBox = document.getElementById('details-box');
    detailsBox.innerHTML = `
    <div class="img-name">
                <img src="${data.data.image}" alt="">
                <h1>${data.data.name}</h1>
                <p>${data.data.releaseDate ? data.data.releaseDate : 'Release data not found'}</p>
    </div>

    <div class="specification">
                <div class="mainFeatures">
                    <h3>Main Features</h3>
                    <table>
                        <tr>
                            <td>Storage</td>
                            <td>${data.data.mainFeatures.storage}</td>
                        </tr>
                        <tr>
                            <td>Display Size</td>
                            <td>${data.data.mainFeatures.displaySize}</td>
                        </tr>
                        <tr>
                            <td>ChipSet</td>
                            <td>${data.data.mainFeatures.chipSet}</td>
                        </tr>
                        <tr>
                            <td>Memory</td>
                            <td>${data.data.mainFeatures.memory}</td>
                        </tr>
                        <tr>
                            <td>Sensors</td>
                            <td>${data.data.mainFeatures.sensors[0]}, ${data.data.mainFeatures.sensors[1]}, ${data.data.mainFeatures.sensors[3]}</td>
                        </tr>
                    </table>
                </div>
                <div class="others">
                    <h3>Others</h3>
                    <table>
                        <tr>
                            <td>WLAN</td>
                            <td>${data.data.others?.WLAN ? data.data.others.WLAN : 'Not found'}</td>
                        </tr>
                        <tr>
                            <td>Bluetooth</td>
                            <td>${data.data.others?.Bluetooth ? data.data.others.Bluetooth : 'Not found'}</td>
                        </tr>
                        <tr>
                            <td>GPS</td>
                            <td>${data.data.others?.GPS ? data.data.others.GPS : 'Not found'}</td>
                        </tr>
                        <tr>
                            <td>NFC</td>
                            <td>${data.data.others?.NFC ? data.data.others.NFC : 'Not found'}</td>
                        </tr>
                        <tr>
                            <td>Radio</td>
                            <td>${data.data.others?.Radio ? data.data.others.Radio : 'Not found'}</td>
                        </tr>
                        <tr>
                            <td>USB</td>
                            <td>${data.data.others?.USB ? data.data.others.USB : 'Not found'}</td>
                        </tr>
                    </table>
                </div>
            </div>`

            phoneDetails.appendChild(detailsBox)
}
