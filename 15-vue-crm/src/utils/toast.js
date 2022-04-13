import M from "materialize-css";

export function toast(message, error = '') {
    if (error) {
        M.toast({html: `[Ошибка]: ${message}`, classes: 'toast-error'});
    } else {
        M.toast({html: message});
    }
}
