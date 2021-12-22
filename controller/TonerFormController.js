import { Toner } from '../model/Toner.js';
import { UI } from './TonerUIController.js';

class Form {
    static getValues() {
        return {
            model: document.querySelector('#toner-model').value,
            quant: document.querySelector('#toner-quant').value
        }
    };

    static validateFields() {
        const { model, quant } = this.getValues();

        if(model === '' || quant === '') {
            UI.showAlert('Por favor, preencha todos os campos', 'danger');
            return false;
        }
        return true;
    };

    static clearFields() {
        document.querySelector('#toner-model').value = '';
        document.querySelector('#toner-quant').value = '';
    };

    static submit(event) {
        event.preventDefault();

        try {
            const isValid = this.validateFields();

            if(isValid) {
                const { model, quant } = this.getValues();

                // id = posiçao do toner no array
                // [toner0, toner1, toner2, ...]
                // 0, 1, 2 ...

                const toners = Toner.read();
                const id = toners.length;

                const toner = new Toner(id, model, quant);

                Toner.create(toner);
                UI.addToner(toner);
                UI.showAlert('Toner adicionado', 'success');
                this.clearFields();
            }

        } catch (error) {
            alert(error.message);
        }
    };
};

export { Form }