import { Toner } from '../model/Toner.js';
import { UI } from './TonerUIController.js';

class Modal {
    static open() {
        document.querySelector('.modal').style.display = 'block';
    };

    static close() {
        document.querySelector('.modal').style.display = 'none';
    };

    static fillFields(receivedId) {
        const toners = Toner.read();

        toners.forEach((toner) => {
            if(toner.id === receivedId) {
                document.querySelector('#tonerModel-modal').value = toner.model;
                document.querySelector('#tonerQuant-modal').value = toner.quant;
            }
        });
    };

    static getValues() {
        return {
            model: document.querySelector('#tonerModel-modal').value,
            quant: document.querySelector('#tonerQuant-modal').value
        }
    };

    static validateFields() {
        const { model, quant } = this.getValues();

        if(model === '' || quant === '') {
            UI.showAlert('Por favor preencha todos os campos', 'danger');
            return false;
        }
        return true;
    };

    static clearFields() {
        document.querySelector('#tonerModel-modal').value = '';
        document.querySelector('#tonerQuant-modal').value = '';
    };

    static submit(event, receivedId) {
        event.preventDefault();

        try {
            const isValid = this.validateFields();

            if(isValid) {
                const { model, quant } = this.getValues();

                const updatedToner = {
                    id: receivedId,
                    model,
                    quant
                }

                Toner.update(updatedToner, receivedId);
                location.reload();
            }
        } catch (error) {
            alert(error.message);
        }
    };
};

export { Modal }