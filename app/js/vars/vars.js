const form = document.querySelector('.search__form');
const descriptionList = document.querySelector('.repositories__descriptions');
const repositoriesInner = document.querySelector('.repositories__inner');
const repositoriesWrapper = document.querySelector('.repositories__wrapper');
const reposList = document.querySelector('.repositories__list');
const DEFAULT_URL = "https://api.github.com/search/repositories";
let theme = '';

const loadingElement = document.createElement('div');
loadingElement.classList.add('repositories__loading');
loadingElement.style.backgroundImage = 'url("images/loading.gif")';

const errorElement = document.createElement('div');
errorElement.classList.add('repositories__error');
errorElement.style.backgroundImage = 'url("images/error.gif")';
