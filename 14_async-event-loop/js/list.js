import { renderFn } from '../js/index.js';

export function render(data) {
    const container = document.getElementById('block'),
    contentBlock = document.createElement('div'),
    header = document.createElement('h1'),
    filmCardBox = document.createElement('div');
    
    contentBlock.classList.add('container','text-center')
    filmCardBox.classList.add('d-flex', 'flex-column')
    header.classList.add('p-3', 'text-center', 'mb-2')

    header.textContent = 'Все части';

    contentBlock.append(filmCardBox)
    container.append(header,contentBlock)
    
  for (const [index, film] of data.results.entries()) {
    const filmButton = document.createElement('a');

    filmButton.classList.add('btn', 'btn-primary', 'w-100','mb-1');

    filmButton.href = `?film=${index + 1}`;
    filmButton.textContent = `${index + 1}. ${film.title}`;

    filmCardBox.append(filmButton);
    
    filmButton.addEventListener('click', e => {
      e.preventDefault();
      window.history.pushState(null, '', `?film=${index + 1}`);
      renderFn(
        '../js/film.js',
        `https://swapi.dev/api/films/${index + 1}`,
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css'
      );
    });
  }

  return contentBlock;
}
