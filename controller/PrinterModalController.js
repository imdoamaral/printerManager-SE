import { Printer } from '../model/Printer.js';

class Modal {
    static open() {
        document.querySelector('.modal').style.display = 'block';
    };
    
    static close() {
        document.querySelector('.modal').style.display = 'none';
    };

    static fillFields(serialNumberUI) {
        const printers = Printer.read()

        // preenche o modal com os valores da impressora
        printers.forEach((printer) => {
            if (printer.serialNumber === serialNumberUI) {
                document.querySelector('#serialNumber_modal').value = printer.serialNumber;
                document.querySelector('#manufacturer_modal').value = printer.manufacturer;
                document.querySelector('#model_modal').value = printer.model;
                document.querySelector('#tonerLastSwap_modal').value = printer.tonerLastSwap;
                document.querySelector('#pageCountInstructions_modal').value = printer.pageCountInstructions;
                document.querySelector('#overallCount_modal').value = printer.overallCount;
                document.querySelector('#departmentName_modal').value = printer.departmentName;
                document.querySelector('#proprietorName_modal').value = printer.proprietorName;
                document.querySelector('#tonerModel_modal').value = printer.tonerModel;
            }
        });
    };

    static getValues() {
        return {
            serialNumber: document.querySelector('#serialNumber_modal').value,
            manufacturer: document.querySelector('#manufacturer_modal').value,
            model: document.querySelector('#model_modal').value,
            tonerLastSwap: document.querySelector('#tonerLastSwap_modal').value,
            pageCountInstructions: document.querySelector('#pageCountInstructions_modal').value,
            overallCount: document.querySelector('#overallCount_modal').value,
            departmentName: document.querySelector('#departmentName_modal').value,
            proprietorName: document.querySelector('#proprietorName_modal').value,
            tonerModel: document.querySelector('#tonerModel_modal').value
        }
    };

    static validateFields() {
        const { serialNumber, manufacturer, model} = this.getValues();

        if (serialNumber === ''
            || manufacturer === ''
            || model === ''
        ) {
            UI.showAlert('Por favor, preencha todos os campos', 'danger');
            return false;
        }
        return true;
    };

    static clearFields() {
        document.querySelector('#serialNumber_modal').value = '';
        document.querySelector('#manufacturer_modal').value = '';
        document.querySelector('#model_modal').value = '';
        document.querySelector('#tonerLastSwap_modal').value = '';
        document.querySelector('#pageCountInstructions_modal').value = '';
        document.querySelector('#overallCount_modal').value = '';
        document.querySelector('#departmentName_modal').value = '';
        document.querySelector('#proprietorName_modal').value = '';
        document.querySelector('#tonerModel_modal').value = '';
    };

    static submit(event, serialNumberUI) {
        event.preventDefault();

        try {
            const isValid = this.validateFields();

            if (isValid) {
                const { serialNumber, manufacturer, model, tonerLastSwap, pageCountInstructions, overallCount, departmentName, proprietorName, tonerModel} = this.getValues();

                const updatedPrinter = {
                    serialNumber,
                    manufacturer,
                    model,
                    tonerLastSwap,
                    pageCountInstructions,
                    overallCount,
                    departmentName,
                    proprietorName,
                    tonerModel
                }

                Printer.update(updatedPrinter, serialNumberUI);
                location.reload();
            }
        } catch (error) {
            alert(error.message);
        }
    };
};

export { Modal }