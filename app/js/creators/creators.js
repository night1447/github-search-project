const createDescriptionItem = (innerHtml = '', additionalClass = '') => {
    const li = document.createElement('li');
    li.classList.add('repositories__description');
    additionalClass ? li.classList.add(additionalClass) : '';
    li.innerHTML = innerHtml;
    return li;
}
const createRepository = ({
                              ['name']: nameRepository,
                              ['html_url']: htmlUrl,
                              watchers,
                              owner,
                              description,
                              topics,
                              id
                          }) => {
    const repository = document.createElement('li');
    repository.classList.add('repository');
    repository.id = id;

    const name = document.createElement('h3');
    const nameHref = document.createElement('a');
    const wrapper = document.createElement('div');
    const shell = document.createElement('div');
    const ownerName = document.createElement('h4');
    const ownerNameHref = document.createElement('a');
    const ownerPhoto = document.createElement('div');
    const descriptionBlock = document.createElement('p');
    const topicList = document.createElement('ul');
    const watchBlock = document.createElement('div');
    const redirect = document.createElement('a');

    name.classList.add('repository__title');
    nameHref.classList.add('repository__href');
    wrapper.classList.add('repository__wrapper');
    shell.classList.add('repository__shell');
    ownerName.classList.add('repository__subtitle');
    ownerNameHref.classList.add('repository__href');
    ownerPhoto.classList.add('repository__photo');
    descriptionBlock.classList.add('repository__description');
    topicList.classList.add('repository__topics');
    watchBlock.classList.add('repository__watchers');
    redirect.classList.add('repository__redirect');
    redirect.classList.add('btn');

    nameHref.target = '_blank';
    nameHref.href = htmlUrl;
    nameHref.innerHTML = nameRepository;
    push(nameHref, name);

    ownerNameHref.target = '_blank';
    ownerNameHref.href = owner['html_url'];
    ownerNameHref.innerHTML = owner['login'];
    ownerPhoto.style.backgroundImage = `url(${owner['avatar_url']})`;
    push(ownerNameHref, ownerName);

    descriptionBlock.innerHTML = description || 'Данный репозиторий не имеет описания';

    redirect.innerHTML = 'Перейти';
    redirect.href = htmlUrl;
    redirect.target = '_blank';

    watchBlock.innerHTML = watchers;
    watchBlock.style.backgroundImage = `url('images/watchers.svg')`

    topics.forEach(topic => {
        const li = document.createElement('li');
        li.classList.add('repository__topic');
        li.innerHTML = topic;
        setRandomBackgroundColor(li);
        push(li, topicList);
    })

    push(ownerPhoto, wrapper);
    push(ownerName, wrapper);

    push(watchBlock, shell);
    push(redirect, shell);

    push(name, repository);
    push(wrapper, repository);
    push(descriptionBlock, repository);
    push(topicList, repository);
    push(shell, repository);
    return repository;
}

const createTotalCount = (total) => {
    const findElement = descriptionList.querySelector('.repositories__description_total');
    const templateString = total ? `Всего найдено: <span class="repositories__description_value">${total}</span> репозиториев` : 'К сожалению, ничего не найдено, попробуйте еще раз';

    if (!findElement) {
        const li = createDescriptionItem(templateString, 'repositories__description_total');
        push(li, descriptionList);
    } else {
        findElement.innerHTML = templateString;
    }

}

const createDescription = (theme) => {
    descriptionList.innerHTML = '';
    const li = createDescriptionItem(`Тема для поиска репозиториев: <span class="repositories__description_value">${theme}</span>`);
    push(li, descriptionList);
};

const createMoreButton = () => {
    let page = 2;
    const findButton = repositoriesWrapper.querySelector('.repositories__more');
    if (!findButton) {
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('repositories__more');
        button.classList.add('btn');
        button.innerHTML = 'Загрузить далее';
        push(button, repositoriesWrapper);
        button.addEventListener('click', () => {
            const response = getData(DEFAULT_URL, {
                per_page: 10,
                page: page,
                q: theme,
            })
            page++;
            response.then((data) => {
                pushListRepositories(data['items']);
            })
                .catch(() => {
                    setError(true)
                })
        })
    }
};
const removeMoreButton = () => repositoriesWrapper.querySelector('.repositories__more').remove();

const pushListRepositories = (items) => {
    items.forEach(item => push(createRepository(item), reposList));
}

