const form = document.querySelector('form');
form.addEventListener('submit', handleFormSubmission);

const fields = document.querySelectorAll('[required]'); // select all elements with 'required'
const fieldValidator = createFieldValidator();

for (let field of fields) {
    field.addEventListener('invalid', event => {
        event.preventDefault(); // no more bubbles
        fieldValidator.performCustomValidation(event.target);
    });
    field.addEventListener('blur', event => {
        fieldValidator.performCustomValidation(event.target);
    });
    // blur -> when field loses focus
}

function handleFormSubmission(event) {
    event.preventDefault();
    console.log('Form submitted successfully!');
}

function createFieldValidator() {
    const validationErrorMessages = {
        text: {
            valueMissing: 'Name is a required field',
        },
        email: {
            valueMissing: 'Email is a required field',
            typeMismatch: 'Please enter a valid email'
        }
    };

    function getErrorMessage({ type, validationError }) {
        return validationErrorMessages[type][validationError];
    }

    function performCustomValidation(field) {
        const spanError = field.parentElement.querySelector('span.error');

        const validationError = getFieldValidationError();

        if (validationError) {
            field.style.borderColor = 'red';
            spanError.classList.add('active');
            spanError.innerText = getErrorMessage({ type: field.type, validationError });
        } else {
            field.style.borderColor = 'green';
            spanError.classList.remove('active');
            spanError.innerText = '';
        }

        function getFieldValidationError() {
            if (!field.validity.valid) {
                for (let error in field.validity) {
                    if (field.validity[error]) return error;
                }
            }
        }
    }

    return { performCustomValidation };
}
