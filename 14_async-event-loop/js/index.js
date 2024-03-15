const cssPromises = {};
function resourses(src) {
  if (src.endsWith('.js')) {
    return import(src);
  }
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
      link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  return fetch(src).then(res => res.json());
}
const container = document.getElementById('block'),
search = new URLSearchParams(location.search),
film = search.get('film');
export function renderFn(link, api, css) {
    container.innerHTML = '';
    Promise.all([link, api, css].map((src) => resourses(src))).then(
      ([modulPage, data]) => {
        container.innerHTML = '';
        container.append(modulPage.render(data));
      }
    );
  }
  if (film) {
    renderFn(
      '../js/film.js',
      `https://swapi.dev/api/films/${film}`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css'
    );
  } else {
    renderFn(
      '../js/list.js',
      `https://swapi.dev/api/films`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css'
    );
  }
