import { Printer } from '../model/Printer.js';
import { UI } from './PrinterUIController.js';

class Form {
    static getValues() {
        return {
            serialNumber: document.querySelector('#serialNumber').value,
            manufacturer: document.querySelector('#manufacturer').value,
            model: document.querySelector('#model').value,
            tonerLastSwap: document.querySelector('#tonerLastSwap').value,
            pageCountInstructions: document.querySelector('#pageCountInstructions').value,
            overallCount: document.querySelector('#overallCount').value,
            departmentName: document.querySelector('#departmentName').value,
            proprietorName: document.querySelector('#proprietorName').value,
            tonerModel: document.querySelector('#tonerModel').value,
        }
    };

    static validateFields() {
        const { serialNumber, manufacturer, model} = this.getValues();

        if (serialNumber === ''
            || manufacturer === ''
            || model === ''
        ) {
            UI.showAlert('Por favor, preencha os campos NÚMERO DE SÉRIE, FABRICANTE E MODELO.', 'danger');
            return false;
        }
        return true;
    };

    static clearFields() {
        document.querySelector('#serialNumber').value = '';
        document.querySelector('#manufacturer').value = '';
        document.querySelector('#model').value = '';
        document.querySelector('#tonerLastSwap').value = '';
        document.querySelector('#pageCountInstructions').value = '';
        document.querySelector('#overallCount').value = '';
    };

    static submit(event) {
        // evita o envio automático de formulário
        event.preventDefault();

        try {
            const isValid = this.validateFields();

            if (isValid) {
                const { serialNumber, manufacturer, model, tonerLastSwap, pageCountInstructions, overallCount, departmentName, proprietorName, tonerModel} = this.getValues();

                const printer = new Printer(serialNumber, manufacturer, model, tonerLastSwap, pageCountInstructions, overallCount, departmentName, proprietorName, tonerModel);

                Printer.create(printer);

                UI.addPrinter(printer);

                UI.showAlert('Impressora adicionada', 'success');

                this.clearFields();
            }
        } catch (error) {
            alert(error.message);
        }
    };
};

export { Form }