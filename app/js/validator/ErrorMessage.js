class ErrorMessage {
    constructor() {
    }

    createErrorElement(message) {
        this.elError = document.createElement('span');
        this.elError.classList.add('error');
        this.elError.innerHTML = message;
    }

    setError(domElement, message) {
        const errorElement = domElement.closest('label').querySelector('.error');
        if (errorElement) {
            errorElement.innerHTML = message;
        } else {
            this.createErrorElement(message);
            domElement.after(this.elError);
        }
    }

    removeError(domElement) {
        domElement.closest('label').querySelector('.error')?.remove();

    }
}