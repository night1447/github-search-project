const searchInput = document.querySelector('.search__input');
const searchSubmit = document.querySelector('.search__submit');
const validator = new Validator();
validator.validate(searchInput);
form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (searchInput.classList.contains('_error') || validator.validateInput(searchInput.value)) {
        searchSubmit.classList.add('_error');
        setTimeout(() => {
            searchSubmit.classList.remove('_error');
        }, 1000);
        return;
    }
    const formData = new FormData(form);
    const values = Object.fromEntries(formData);
    if (theme !== values['search-field']) {
        theme = values['search-field'];
        const data = getData(DEFAULT_URL, {
            per_page: 10,
            q: theme,
        });
        setLoading(true);
        data.then((result) => {
            setLoading(false);
            setError(false);
            const total = result['total_count'];
            const items = result['items'];
            createDescription(values['search-field']);
            createTotalCount(total);
            if (total) {
                pushListRepositories(items);
                createMoreButton();
            } else {
                removeMoreButton();
            }
        })
            .catch(() => {
                setError(true);
            })
    }
    event.target.reset();
})