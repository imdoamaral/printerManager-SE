import { UI } from './controller/ProprietorUIController.js';
import { Form } from './controller/ProprietorFormController.js';

// Evento: Listar proprietários
document.addEventListener('DOMContentLoaded', UI.showProprietors());

// Evento: Adicionar um proprietário
document.querySelector('#proprietor-form').addEventListener('submit', (event) => {
    Form.submit(event);
});

// Evento: Remover/Editar um proprietário