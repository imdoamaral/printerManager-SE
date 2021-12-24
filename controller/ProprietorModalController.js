import { Proprietor } from '../model/Proprietor.js';
import { UI } from './ProprietorUIController.js';

class Modal {
    static open() {
        document.querySelector('.modal').style.display = 'block';
    };
    
    static close() {
        document.querySelector('.modal').style.display = 'none';
    };

    static fillFields(receivedId) {
        const proprietors = Proprietor.read();

        proprietors.forEach((proprietor) => {
            if(proprietor.id === receivedId) {
                document.querySelector('#proprietorName_modal').value = proprietor.name;
                document.querySelector('#proprietorContact_modal').value = proprietor.contact;
            }
        });
    };

    static getValues() {
        return {
            name: document.querySelector('#proprietorName_modal').value,
            contact: document.querySelector('#proprietorContact_modal').value
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
        document.querySelector('#proprietorName_modal').value = '';
        document.querySelector('#proprietorContact_modal').value = '';
    };

    static submit(event, receivedId) {
        event.preventDefault();

        try {
            const isValid = this.validateFields();

            if(isValid) {
                const { name, contact } = this.getValues();

                const updatedProprietor = {
                    id: receivedId,
                    name: name,
                    contact: contact
                };

                Proprietor.update(updatedProprietor, receivedId);
                location.reload();
            }
        } catch (error) {
            alert(error.message);
        }
    };
};

export { Modal }