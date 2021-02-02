const TEXT = 'text';
const SELECT = 'select';
const CHECKBOX = 'checkbox';
const ANY = 'any';
const NUMBER = 'number';
const CONFIRM = 'confirm';
const EDITOR = 'editor';
const DIRECTORY = 'directory';

const TYPES = [TEXT, SELECT, CHECKBOX, ANY, NUMBER, CONFIRM, EDITOR, DIRECTORY];

const parser = (type, input) => {

    let inputParsed = null;
    let message = null;

    switch (type) {
        case TEXT:
            try {
                inputParsed = input.toString();
            } catch (e) {
                message = e.message;
            }
            break;
        case NUMBER:
            try {
                inputParsed = parseFloat(input);
            } catch (e) {
                message = e.message;
            }
            break;
        case ANY:
        case EDITOR:
            try {
                inputParsed = JSON.parse(input);
            } catch (e) {
                message = e.message;
            }
            break;
        default:
            return {
                input,
                error: message
            };
    }

    if (message) {
        return {
            input,
            error: message
        };
    }

    return {
        input: inputParsed,
        error: message
    };
};

const validator = (type, input, options = []) => {

    const contain = (option) => option.value === input;
    switch (type) {

        case TEXT:
            return typeof (input === 'string');
        case NUMBER:
            return typeof (input === 'number');
        case SELECT:
            return options.some(contain);
        case CHECKBOX:
            return Array.isArray(input);
        case ANY:
            return typeof (input === 'object');
        case EDITOR:
            return typeof (input === 'object' || input === 'string');
        case CONFIRM:
            return typeof (input === 'boolean');
        case DIRECTORY:
            return typeof (input === 'string');
        default:
            return false;
    }
};

export {
    TYPES,
    TEXT,
    NUMBER,
    SELECT,
    CHECKBOX,
    ANY,
    CONFIRM,
    EDITOR,
    DIRECTORY,
    validator,
    parser,
};
