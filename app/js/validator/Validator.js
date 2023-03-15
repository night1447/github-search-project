class Validator {
    constructor() {
    }

    validateInput = (value = '') => {
        const message = 'Слишком маленькое по содержанию';
        const isLength = value.length < 2;
        if (isLength) {
            return message;
        }

        return '';
    }
    checkError = (type, value) => {
        if (type === 'text') {
            return this.validateInput(value);
        }
        return false;
    }

    validate(domElement) {
        const type = domElement.type;
        const errorMessage = new ErrorMessage();
        domElement.addEventListener('change', () => {
            const message = this.checkError(type, domElement.value);
            if (message || !domElement.value) {
                domElement.classList.add('_error');
                errorMessage.setError(domElement, message);
            } else {
                domElement.classList.remove('_error');
                errorMessage.removeError(domElement);
            }
        });
    }
}