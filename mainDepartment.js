import { UI } from './controller/DepartmentUIController.js';
import { Form } from './controller/DepartmentFormController.js';
import { Department } from './model/Department.js';
import { Modal } from './controller/DepartmentModalController.js';

// Evento: Listar departamentos
document.addEventListener('DOMContentLoaded', UI.showDepartments);

// Evento: Adicionar um departamento
document.querySelector('#department-form').addEventListener('submit', (event) => {
    Form.submit(event);
})

// Evento: Remover/Editar um departamento
document.querySelector('#department-list').addEventListener('click', (event) => {
    // remover
    if(event.target.classList.contains('delete')) {
        Department.delete(event.target.parentElement.parentElement.firstElementChild.textContent);
        UI.removeDepartment(event.target);
        UI.showAlert('Departamento deletado', 'success');
    }
    
    // editar
    if(event.target.classList.contains('edit')) {
        const id = parseInt(event.target.parentElement.parentElement.firstElementChild.textContent);

        Modal.open();
        Modal.fillFields(id);

        document.querySelector('#modal-form').addEventListener('submit', (event) => {
            Modal.submit(event, id);
            Modal.close();
        });
    }
});