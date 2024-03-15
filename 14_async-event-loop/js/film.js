import { renderFn } from './index.js';

export function render(data) {
    const container = document.getElementById('block'),
    contentMainBlock = document.createElement('div'),
    contentBlock = document.createElement('div'),
    buttonBack = document.createElement('button'),
    headerEpisod = document.createElement('h1'),
    headerPlanet = document.createElement('h2'),
    planetList = document.createElement('div'),
    planetListCont = document.createElement('div'),
    headerSpecies = document.createElement('h2'),
    speciesListCont = document.createElement('div'),
    speciesList = document.createElement('div');

    let planetslist;
    let specieslist;

    container.classList.add('container');
    contentBlock.classList.add('text-center');
    headerEpisod.classList.add('mb-3','mt-3',);
    buttonBack.classList.add('btn', 'btn-primary','mt-3');
    
    function content(dataCont, optionslist, list) {
        dataCont.forEach(option => {
          fetch(option)
            .then(res => res.json())
            .then(data => {
              optionslist = document.createElement('p');
              optionslist.classList.add('p-2','col');
              optionslist.textContent = `  ${data.name} `;
              list.classList.add('row')
              list.append(optionslist);
            });
        });
      }

    buttonBack.textContent = 'Back to episodes';
    headerEpisod.textContent = data.title + ` episode: ${number(data.episode_id)}`;
    headerPlanet.textContent = 'Planets';
    headerSpecies.textContent = 'Species';

    function number(x) {
        if (x == 1) x = 'I';
        if (x == 2) x = 'II';
        if (x == 3) x = 'III';
        if (x == 4) x = 'IV';
        if (x == 5) x = 'V';
        if (x == 6) x = 'VI';
        return x;
      }

    buttonBack.addEventListener('click', e => {
    e.preventDefault();
    window.history.back();
    renderFn(
      '../js/list.js',
      `https://swapi.dev/api/films`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css'
    );
    });
    
    content(data.planets, planetslist, planetListCont);
    content(data.species, specieslist, speciesListCont);

    contentMainBlock.append(buttonBack,headerEpisod)
    planetList.append(headerPlanet,planetListCont)
    speciesList.append(headerSpecies,speciesListCont)
    contentBlock.append(contentMainBlock,planetList,speciesList)
    container.append(contentBlock)
    
    return contentBlock;
}


