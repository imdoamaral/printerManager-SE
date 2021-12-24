import { UI } from "./ProprietorUIController.js";
import { Proprietor } from '../model/Proprietor.js';

class Form {
    static getValues() {
        return {
            name: document.querySelector('#proprietorName').value,
            contact: document.querySelector('#proprietorContact').value
        }
    };

    static validateFields() {
        const { name, contact } = this.getValues();

        if(name === '' || contact === '') {
            UI.showAlert('Por favor, preencha todos os campos', 'danger');
            return false;
        }
        return true;
    };

    static clearFields() {
        document.querySelector('#proprietorName').value = '';
        document.querySelector('#proprietorContact').value = '';
    };

    static submit(event) {
        event.preventDefault();

        try {
            const isValid = this.validateFields();

            if(isValid) {
                const { name, contact } = this.getValues();

                const proprietors = Proprietor.read();
                const id = proprietors.length;

                const proprietor = new Proprietor(id, name, contact);

                Proprietor.create(proprietor);
                
                UI.addProprietor(proprietor);

                UI.showAlert('Proprietário adicionado', 'success');

                this.clearFields();
            }
            
        } catch (error) {
            alert(error.message);
        }
    };
};

export { Form }