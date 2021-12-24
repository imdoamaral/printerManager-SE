import { UI } from './controller/ProprietorUIController.js';
import { Form } from './controller/ProprietorFormController.js';
import { Proprietor } from './model/Proprietor.js';
import { Modal } from './controller/ProprietorModalController.js';

// Evento: Listar proprietários
document.addEventListener('DOMContentLoaded', UI.showProprietors());

// Evento: Adicionar um proprietário
document.querySelector('#proprietor-form').addEventListener('submit', (event) => {
    Form.submit(event);
});

// Evento: Remover/Editar um proprietário
document.querySelector('#proprietor-list').addEventListener('click', (event) => {
    // remover
    if(event.target.classList.contains('delete')) {
        const id = event.target.parentElement.parentElement.firstElementChild.textContent;

        Proprietor.delete(id);
        UI.removeProprietor(event.target);
        UI.showAlert('Proprietário deletado', 'success');
    }

    // editar
    if(event.target.classList.contains('edit')) {
        const id = parseInt(event.target.parentElement.parentElement.firstElementChild.textContent);

        Modal.open();
        Modal.fillFields(id);

        document.querySelector('#modal-form').addEventListener('submit', (event) => {
            Modal.submit(event, id);
            Modal.close();
        })
    }
})