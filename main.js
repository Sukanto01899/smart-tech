console.log('connected')

const searchBtn = document.getElementById('search-btn')
searchBtn.addEventListener('click', ()=>{
    const searchText = document.getElementById('search-text')
    showSearchResult(searchText.value)
    searchText.value = ''
})

const showSearchResult = (searchText)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
}