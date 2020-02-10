const form = document.querySelector('.form');
const totalCountries = document.querySelector('.total-countries');
const resultParagraph = document.querySelector('.result-paragraph');

const searchInput = document.querySelector('.search-input');
const nameBtnSort = document.querySelector('.name-btn');
const capitalBtnSort = document.querySelector('.capital-btn');
const populationBtnSort = document.querySelector('.population-btn');
const countriesWrapper = document.querySelector('.countries-wrapper');
const statisticsContainer = document.querySelector('.statistics-container');
const backToTopBtn = document.querySelector('.back-to-top');


// statistics
const worldBarContainer = document.querySelector('.world-bar__container');
const statisticsWrapper = document.querySelector('.stats-container');
const btnStatsContainer = document.querySelector('.statistics-btn__container');
const displayPopulationBtn = document.querySelector('.pop-btn');
const displayLanguagesBtn = document.querySelector('.lang-btn');
const displayText = document.querySelector('.text-paragraph');


let arrowName = document.getElementById('arrow-name');
let arrowCapital = document.getElementById('arrow-capital');
let arrowPopulation = document.getElementById('arrow-population');


form.addEventListener('submit', (e) => {
    e.preventDefault();
});



//adds a flag that toggles whether the countries are sort ascending or descending
let flag = false;
const toggle = () => {
  flag = !flag;
  return flag;
}

const calculateWorldPopulation = () => {
    let sum = 0;
    for(const country in countries) {
        let{population} = countries[country];
        sum = sum + population;
        

    }
    return sum 
    
}


const createWorldBar = () => {
    let worldPopulation = calculateWorldPopulation();
    let content = '';
    let worldPopWidth = 100
    content += 
    `<div class="world-bar__container">
        <div><p>World</p></div>
        <div class="world-bar"style ="width: ${worldPopWidth}%"></div>
        <div><p>${worldPopulation.toString()}</p></div>
    </div>`
    worldBarContainer.innerHTML = content;
} 

    
const searchByAll = (searchInput) => {
   
    let countryArr = [];

    countriesWrapper.textContent = '';
    statisticsWrapper.textContent = '';
    displayText.textContent = '';
   
    createWorldBar();
    let regex = /^[A-Zaz]/g;

    if(searchInput.match(regex)) {
        resultParagraph.textContent = 'Please enter only letters' 
    } else {

        for(const country of countries) {
        
            if(country.name.toLowerCase().includes(searchInput) || country.capital.toLowerCase().includes(searchInput) || country.languages.toString().toLowerCase().includes(searchInput)) {
                let countryObj = {};
            //create elements
            countryObj.name = country.name;
            countryObj.capital = country.capital;
            countryObj.languages = country.languages;
            countryObj.flag = country.flag;
            countryObj.population = country.population;    

            countryArr.push(countryObj);

            }
    
            resultParagraph.textContent = `${countryArr.length} countries satisfy the criteria.`
    
        }
        return countryArr
    
    }



}
    

searchInput.addEventListener('keyup', () => {
    const newArr = searchByAll(searchInput.value)
    displayCountries(newArr);
});


const displayCountries = (arr) => {
    let countries = [...arr];
    countriesWrapper.textContent = '';
    statisticsWrapper.textContent = '';
    let contentCountries ='';
    let contentStatistics ='';

    totalCountries.textContent = countries.length;
    createWorldBar();
    countries.forEach(
        ({name, flag, capital, languages, population}) =>

        (contentCountries +=
        `<div class='country-container grow'>
            <img src="${flag}" class="flag">
                <h4 class="country-name">${name}</h4>
                <p>Capital: ${capital}</p>
                <p>Languages: ${languages}</p>
                <p>Population: ${population.toString()}</p>
            </div>`, 

            contentStatistics +=
                `<div class="statistics-countries__container">
                    <div><p>${name}</p></div>
                        <div class="country-bar"style ="width: ${population/10000000}px"></div>
                    <div><p>${population.toString()}</p></div>
                </div>`)
    )
    
        countriesWrapper.innerHTML = contentCountries; 
        statisticsWrapper.innerHTML = contentStatistics;

    

}

const sortByNameOrder = (newArr) => {
    newArr.sort((a, b) => {
        if(a.name > b.name) return -1;
        if(a.name < b.name) return 1;
        return 0;

    })
    return newArr;
}

nameBtnSort.addEventListener('click', sortByName = () => {
  
    countriesWrapper.textContent = '';
    nameBtnSort.classList.add('active');
    capitalBtnSort.classList.remove('active');
    populationBtnSort.classList.remove('.active');
    arrowName.style.display = 'block';
    arrowCapital.style.display = 'none';
    arrowPopulation.style.display = 'none';
    nameBtnSort.classList.add('active');
    const newArr = searchByAll(searchInput.value);
    let sortedArrByName = sortByNameOrder(newArr);
    if(flag === true) {
        displayCountries(sortedArrByName);
        arrowName.setAttribute('class', 'fas fa-long-arrow-alt-up');

    } else {
        arrowName.setAttribute('class', 'fas fa-long-arrow-alt-down');
        displayCountries(sortedArrByName.reverse())
    }
    toggle();


});



const sortByCapitalOrder = (newArr) => {
    newArr.sort((a, b) => {
        if(a.capital < b.capital) return -1;
        if(a.capital > b.capital) return 1;
        return 0;
    })
    return newArr;
}


   
capitalBtnSort.addEventListener('click', sortByCapital = () => {
    countriesWrapper.textContent = '';
    nameBtnSort.classList.remove('active');
    capitalBtnSort.classList.add('active');
    populationBtnSort.classList.remove('.active');
    arrowName.style.display = 'none';
    arrowCapital.style.display = 'block';
    arrowPopulation.style.display = 'none';
    const newArr = searchByAll(searchInput.value);
    let sortedArrCapital = sortByCapitalOrder(newArr);
    if(flag === true) {
        displayCountries(sortedArrCapital);
        arrowCapital.setAttribute('class', 'fas fa-long-arrow-alt-down');

    } else {
        arrowCapital.setAttribute('class', 'fas fa-long-arrow-alt-up');
        displayCountries(sortedArrCapital.reverse())
    }
    toggle();


});

const sortByPopOrder = (newArr) => {
    newArr.sort((a, b) => {
        if(a.population > b.population) return -1;
        if(a.population < b.population) return 1;
        return 0;
    })
    return newArr;
}

populationBtnSort.addEventListener('click', sortCountriesByPopulation = () => {
    countriesWrapper.textContent = '';
    nameBtnSort.classList.remove('active');
    capitalBtnSort.classList.remove('active');
    populationBtnSort.classList.add('active');
    arrowName.style.display = 'none';
    arrowCapital.style.display = 'none';
    arrowPopulation.style.display = 'block';
    const newArr = searchByAll(searchInput.value);
    let sortedArrPopulation = sortByPopOrder(newArr)
    if(flag === true) {
        displayCountries(sortedArrPopulation);
        arrowPopulation.setAttribute('class', 'fas fa-long-arrow-alt-down');

    } else {
        arrowPopulation.setAttribute('class', 'fas fa-long-arrow-alt-up');
        displayCountries(sortedArrPopulation.reverse())
    }
    toggle();
    
})



const displayTenLargestCountries = () => {
    let arr = [...countries]
    statisticsWrapper.textContent = "";
    let stats = '';
         arr.sort((a, b) => {
             if(a.population > b.population) return -1;
             if(a.population < b.population) return 1;
             return 0;
         })
         
     
         let sortedCountByPop = arr.slice(0, 10);
         displayText.textContent = `${sortedCountByPop.length} largest countries in the world.`
         createWorldBar();

         sortedCountByPop.forEach(
             ({name, population}) => 
             
             (stats +=
             `<div class="statistics-countries__container">
                 <div><p class="populationCountry">${name}</p></div>
                     <div class="country-bar"style ="width: ${population/6000000}px"></div>
                 <div><p class="populationNumber">${population.toString()}</p></div>
             </div>`)
         )

             statisticsWrapper.innerHTML = stats;
            
         
}

const displayTenSpokenLanguages = () => {
    statisticsWrapper.textContent = "";
    let langArr = [];
    for(const country of countries) {
        let {languages} = country;
        for(const language of languages) {
            langArr.push(language);
    }


    }

    
    let setLang = new Set(langArr);
    const countWords = [];
    const paragraphWords = {};
    for (const w of setLang) {
        const filteredWords = langArr.filter(word => word === w);
        countWords.push({word: w, paragraphWords: filteredWords.length});
    }


    countWords.sort((a, b) => {
        if(a.paragraphWords > b.paragraphWords) return -1;
        if(a.paragraphWords < b.paragraphWords) return 1;
        return 0;
    })

    let sorted = countWords.slice(0, 10);
    displayText.textContent = `${sorted.length} most spoken languages in the world.`;
    let langContent = '';
    for(const w of sorted) {

        let {word, paragraphWords} = w;

        langContent +=
        `<div class="statistics-countries__container">
            <div><p>${word}</p></div>
                <div class="country-bar"style ="width: ${paragraphWords*5}px"></div>
            <div><p>${paragraphWords}</p></div>
        </div>`
        statisticsWrapper.innerHTML = langContent;

      
    }

}





displayPopulationBtn.addEventListener('click', () => displayTenLargestCountries());
displayLanguagesBtn.addEventListener('click', () => displayTenSpokenLanguages());

backToTopBtn.addEventListener('click', backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

displayTenLargestCountries();


//loads the countries
document.addEventListener('DOMContentLoaded', displayCountries(countries));










