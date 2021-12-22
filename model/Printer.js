import { Storage } from './Storage.js';

class Printer {
    constructor(serialNumber, manufacturer, model, tonerLastSwap, pageCountInstructions, overallCount, departmentName, proprietorName, tonerModel) {
        this.serialNumber = serialNumber;
        this.manufacturer = manufacturer;
        this.model = model;
        this.tonerLastSwap = tonerLastSwap;
        this.pageCountInstructions = pageCountInstructions;
        this.overallCount = overallCount;
        this.departmentName = departmentName;
        this.proprietorName = proprietorName;
        this.tonerModel = tonerModel;
    }

    // ----- CRUD -----

    static create(printer) {
        const printers = Storage.getPrinters();

        printers.push(printer);
        Storage.setPrinters(printers);
    };

    static read() {
        return Storage.getPrinters();
    };

    static update(updatedPrinter, serialNumber) {
        const printers = Storage.getPrinters();

        printers.forEach((printer, index) => {
            if(printer.serialNumber === serialNumber) {
                printers[index] = updatedPrinter;
            }
        });

        Storage.setPrinters(printers);
    };

    static delete(serialNumber) {
        const printers = Storage.getPrinters();

        printers.forEach((printer, index) => {
            if(printer.serialNumber === serialNumber) {
                printers.splice(index, 1);
            }
        });

        Storage.setPrinters(printers);
    };
 };

 export { Printer }