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
const statisticsWrapper = document.querySelector('.statistics-countries__wrapper');
const btnStatsContainer = document.querySelector('.statistics-btn__container');
const displayPopulationBtn = document.querySelector('.pop-btn');
const displayLanguagesBtn = document.querySelector('.lang-btn');
const displayText = document.querySelector('.text-paragraph');


let countryContainer,
     countryFlag,
     countryName,
     countryCapital,
     countryLanguages,
     countryPopulation;

let arrowName = document.getElementById('arrow-name');
let arrowCapital = document.getElementById('arrow-capital');
let arrowPopulation = document.getElementById('arrow-population');


form.addEventListener('submit', (e) => {
    e.preventDefault();
});

const createNode = (e) => {
    return document.createElement(e);
};

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


const createCountry = () => {
    countryContainer = createNode('div');
    countryFlag = createNode('img');
    countryName = createNode('h4');
    countryCapital = createNode('p');
    countryLanguages = createNode('p');
    countryPopulation = createNode('p');

    countryContainer.setAttribute('class', 'country-container grow');
    countryFlag.setAttribute('class', 'flag');
    countryName.setAttribute('class', 'country-name');

}

const appendCountry = () => {
    countryContainer.append(countryFlag, countryName, countryCapital, countryLanguages, countryPopulation);
    countriesWrapper.append(countryContainer);
}

const createWorldBar = () => {

    let worldDiv = createNode('div');
    let worldNameDiv = createNode('div');
    let worldName = createNode('p');
    let worldPop = createNode('p');
    let worldBar = createNode('div');
    worldDiv.setAttribute('class', 'statistics-countries__container')
    worldName.textContent = 'World';
    let worldPopulation = calculateWorldPopulation();
    worldBar.style.width = `${worldPopulation/10000000}px`;
    worldBar.style.height = '40px';
    worldBar.style.backgroundColor = 'rgb(255, 38, 74)';
    worldPop.textContent = worldPopulation.toString();
    worldNameDiv.append(worldName);
    worldDiv.append(worldNameDiv, worldBar, worldPop);
    statisticsWrapper.append(worldDiv);

} 

const updateStatistics = () => {
    //update population statistics
    
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
            
            
            // createCountry();
    
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

const displayCountries = (countries) => {
    countriesWrapper.textContent = '';
    statisticsWrapper.textContent = '';

    totalCountries.textContent = countries.length;
    createWorldBar();

    for(const country in countries) {
        let {name, flag, capital, languages, population} = countries[country];

        createCountry();
        
        //setting textContent
        countryFlag.src = `${flag}`;
        countryName.textContent = `${name}`;
        countryCapital.textContent = `Capital: ${capital}`;
        countryLanguages.textContent = `Languages: ${languages}`;
        countryPopulation.textContent = `Population: ${population.toString()}`;
    
        //appendingDivs
        appendCountry();

        const countryPopContainer = createNode('div');
        countryPopContainer.setAttribute('class', 'statistics-countries__container');
        let countryPopName = createNode('p');
        let countryNameDiv = createNode('div');
        let countryBar = createNode('div');
        countryBar.style.width = `${population/10000000}px`;
        countryBar.style.height = '40px';
        countryBar.style.backgroundColor = 'rgb(255, 38, 74)';
        let countryPop = createNode('p')
        let countryPopulationDiv = createNode('div');
        countryPopName.textContent = name;
        countryPop.textContent = population.toString();
        countryNameDiv.append(countryPopName);
        countryPopContainer.append(countryNameDiv, countryBar);
    
        countryPopulationDiv.append(countryPop);
        countryPopContainer.append(countryPopulationDiv);


        statisticsWrapper.append(countryPopContainer);

    }

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

//loads the countries
displayCountries(countries);




const displayTenLargestCountries = () => {
    statisticsWrapper.textContent = "";
         countries.sort((a, b) => {
             if(a.population > b.population) return -1;
             if(a.population < b.population) return 1;
             return 0;
         })
         
     
         let sortedCountByPop = countries.slice(0, 10);
         displayText.textContent = `${sortedCountByPop.length} largest countries in the world.`
         createWorldBar();

         for(const country of sortedCountByPop) {
             let {name, population} = country;     
             
            const countryPopContainer = createNode('div');
            countryPopContainer.setAttribute('class', 'statistics-countries__container');
            let countryPopName = createNode('p');
            let countryNameDiv = createNode('div');
            let countryBar = createNode('div');
            let worldPopulation = calculateWorldPopulation()
            countryBar.style.width = `${population/6000000}px`;
            countryBar.style.height = '40px';
            countryBar.style.backgroundColor = 'rgb(255, 38, 74)';
            let countryPop = createNode('p')
            let countryPopulationDiv = createNode('div');
            countryPopName.textContent = name;
            countryPop.textContent = population.toString();
            countryNameDiv.append(countryPopName);
            countryPopContainer.append(countryNameDiv, countryBar);
            
            countryPopulationDiv.append(countryPop);
            countryPopContainer.append(countryPopulationDiv);

            statisticsWrapper.append(countryPopContainer);
     
         }
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
    console.log(langArr);

    
    let setLang = new Set(langArr);
    const countWords = [];
    const paragraphWords = {};
    for (const w of setLang) {
        const filteredWords = langArr.filter(word => word === w);
        countWords.push({word: w, paragraphWords: filteredWords.length});
    }

    console.log(countWords);

    countWords.sort((a, b) => {
        if(a.paragraphWords > b.paragraphWords) return -1;
        if(a.paragraphWords < b.paragraphWords) return 1;
        return 0;
    })

    let sorted = countWords.slice(0, 10);
    console.log(sorted);
    displayText.textContent = `${sorted.length} most spoken languages in the world.`
    for(const w of sorted) {
        let{word, paragraphWords} = w;
        console.log(word, paragraphWords);
        const countryContainer = createNode('div');
             countryContainer.setAttribute('class', 'statistics-countries__container');
             let languageName = createNode('p');
             let languageNameDiv = createNode('div');
             let countryBar = createNode('div');
             countryBar.style.width = `${paragraphWords*5}px`;
             countryBar.style.height = '40px';
             countryBar.style.backgroundColor = 'rgb(255, 38, 74)';
             let languageCount = createNode('p')
             let languageCountDiv = createNode('div');
             languageName.textContent = word;
             languageCount.textContent = paragraphWords;
             languageNameDiv.append(languageName);
             countryContainer.append(languageNameDiv);
             countryContainer.append(countryBar);
             
             languageCountDiv.append(languageCount);
             countryContainer.append(languageCountDiv);

             statisticsWrapper.append(countryContainer);
      
    }
}





displayPopulationBtn.addEventListener('click', () => displayTenLargestCountries());
displayLanguagesBtn.addEventListener('click', () => displayTenSpokenLanguages());

backToTopBtn.addEventListener('click', backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

displayTenLargestCountries();










