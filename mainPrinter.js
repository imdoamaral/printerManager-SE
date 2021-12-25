import { Printer } from './model/Printer.js';
import { Modal } from './controller/PrinterModalController.js';
import { UI } from './controller/PrinterUIController.js';
import { Form } from './controller/PrinterFormController.js';
import { Department } from './model/Department.js';
import { Toner } from './model/Toner.js';
import { Proprietor } from './model/Proprietor.js';

// ----- CARREGAMENTOS -----

// Carrega os departamentos
const selectDepartmentName = document.querySelector('#departmentName');
const departments = Department.read();

departments.forEach((department) => {
    selectDepartmentName.add(
        new Option(department.name)
    );
});

// Carrega os toners
const selectTonerModel = document.querySelector('#tonerModel');
const toners = Toner.read();

toners.forEach((toner) => {
    selectTonerModel.add(
        new Option(toner.model)
    );
});

// Carrega os proprietários
const selectProprietor = document.querySelector('#proprietorName');
const proprietors = Proprietor.read();

proprietors.forEach((proprietor) => {
    selectProprietor.add(
        new Option(proprietor.name)
    );
});

// ----- EVENTOS -----

// Evento: Listar impressoras
document.addEventListener('DOMContentLoaded', UI.showPrinters);

// Evento: Adicionar uma impressora
document.querySelector('#printer-form').addEventListener('submit', (event) => {
    Form.submit(event);
});

// Evento: Remover/Editar uma impressora
document.querySelector('#printer-list').addEventListener('click', (event) => {
    // remover
    if (event.target.classList.contains('delete')) {
        Printer.delete(event.target.parentElement.parentElement.firstElementChild.textContent);
        UI.removePrinter(event.target);
        UI.showAlert('Impressora deletada', 'success');
    }

    // editar
    if (event.target.classList.contains('edit')) {
        // Carrega os departamentos (na janela de edição)
        const selectDepartmentNameModal = document.querySelector('#departmentName_modal');
        const departmentsModal = Department.read();

        departmentsModal.forEach((department) => {
            selectDepartmentNameModal.add(
                new Option(department.name)
            );
        });

        // Carrega os toners (na janela de edição)
        const selectTonerModelModal = document.querySelector('#tonerModel_modal');
        const tonersModal = Toner.read();

        tonersModal.forEach((toner) => {
            selectTonerModelModal.add(
                new Option(toner.model)
            );
        });

        // Carrega os proprietários (na janela de edição)
        const selectProprietorModal = document.querySelector('#proprietorName_modal');
        const proprietors = Proprietor.read();

        proprietors.forEach((proprietor) => {
            selectProprietorModal.add(
                new Option(proprietor.name)
            );
        });

        const serialNumberUI = event.target.parentElement.parentElement.firstElementChild.textContent;

        Modal.open();
        Modal.fillFields(serialNumberUI);

        document.querySelector('#modal-form').addEventListener('submit', (event) => {
            Modal.submit(event, serialNumberUI);
            Modal.close();
        });
    }
});