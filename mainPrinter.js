/**
 * Aplicação Javascript + persistência dos dados no localStorage para um sistema de controle de Impressoras e Toners. 
 * Trabalho prático da disciplina de Engenharia de Software I (UFOP).
 */

// ----- IMPORTAÇÃO DOS MÓDULOS -----

import { Printer } from './model/Printer.js';
import { Modal } from './controller/PrinterModalController.js';
import { UI } from './controller/PrinterUIController.js';
import { Form } from './controller/PrinterFormController.js';
import { Department } from './model/Department.js';
import { Toner } from './model/Toner.js';

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
const selectTonerQuant = document.querySelector('#tonerModel_modal');
const toners = Toner.read();

toners.forEach((toner) => {
    selectTonerQuant.add(
        new Option(toner.model)
    );
});

// Carrega os departamentos (na janela de edição)
const selectDepartmentNameModal = document.querySelector('#departmentName_modal');
const departmentsModal = Department.read();

departments.forEach((department) => {
    selectDepartmentNameModal.add(
        new Option(department.name)
    );
});

// Carrega os toners (na janela de edição)
const selectTonerQuantModal = document.querySelector('#tonerModel');
const tonersModal = Toner.read();

tonersModal.forEach((toner) => {
    selectTonerQuantModal.add(
        new Option(toner.model)
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
        const serialNumberUI = event.target.parentElement.parentElement.firstElementChild.textContent;
        
        Modal.open();
        Modal.fillFields(serialNumberUI);

        document.querySelector('#modal-form').addEventListener('submit', (event) => {
            Modal.submit(event, serialNumberUI);
            Modal.close();
        });
    }
});