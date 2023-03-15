const setLoading = (value) => {
    if (value) {
        descriptionList.innerHTML = '';
        reposList.innerHTML = '';
        push(loadingElement, repositoriesInner);
    } else {
        loadingElement.remove();
    }
}
const setError = (value) => {
    if (value) {
        descriptionList.innerHTML = '';
        const li = createDescriptionItem('Произошла ошибка, попробуйте позже', 'repositories__description_error');
        push(li, descriptionList);
        push(errorElement, repositoriesInner);
    } else {
        errorElement.remove();
    }
}
const getData = async (url, properties) => {
    const customizeUrl = () => {
        const result = Object.entries(properties).map(item => item.join('=')).join('&');
        return url + '?' + result;
    }
    try {
        const response = await fetch(customizeUrl(), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (e) {
        setError(true);
    }
}
