// Total de impressoras cadastradas
// Total de impressoras disponível
// Total de impressoras em uso
// Mostrar as impressoras disponíveis - impressoras sem proprietário

import { Printer } from '../model/Printer.js';
import { Toner } from '../model/Toner.js';

class UI {
    static showPrinters() {
       const printers = Printer.read();
       printers.forEach((printer) => UI.addPrinters(printer));
    };

    static addPrinters(printer) {
        const list = document.querySelector('#printer-list');

        const row = document.createElement('tr'); // tr = table row = linha da tabela

        // Obtém a quantidade de toners disponíveis para dada impressora
        let tonerQuant;

        const toners = Toner.read();

        toners.forEach((toner) => {
            if(toner.model == printer.tonerModel) {
                tonerQuant = parseInt(toner.quant);
            }
        });

        // UX = mensagens bonitinhas
        if(tonerQuant === undefined || tonerQuant === 0) tonerQuant = 0;
        if(printer.tonerLastSwap === '') printer.tonerLastSwap = '?';
        if(printer.pageCountInstructions === '') printer.pageCountInstructions = '?';
        if(printer.overallCount === '') printer.overallCount = 0;
        if(printer.departmentName === '') printer.departmentName = '?';
        if(printer.proprietorName === '') printer.proprietorName = '?';

        row.innerHTML = `
            <td>${printer.serialNumber}</td>
            <td>${printer.manufacturer}</td>
            <td>${printer.model}</td>
            <td>${printer.tonerLastSwap}</td>
            <td>${printer.pageCountInstructions}</td>
            <td>${printer.overallCount}</td>
            <td>${printer.departmentName}</td>
            <td>${printer.proprietorName}</td>
            <td>${tonerQuant}</td>
        `
        list.appendChild(row);

    };

    static showTotalPrinters() {
        const printers = Printer.read();
        const length = printers.length;

        const totalPrinters = document.querySelector('.total-printers');
        totalPrinters.innerHTML = `<strong>${length}</strong>`;
    };

    static showInUsePrinters() {
        const printers = Printer.read();
        let inUsePrintersCount = 0;

        printers.forEach((printer) => {
            if(printer.departmentName !== '') {
                inUsePrintersCount++;
            }
        });

        const inUsePrinters = document.querySelector('.in-use-printers');
        inUsePrinters.innerHTML = `<strong>${inUsePrintersCount}</strong>`;
    };

    static showAvailablePrinters() {
        const printers = Printer.read();
        let availablePrintersCount = 0;

        printers.forEach((printer) => {
            if(printer.departmentName === '') {
                availablePrintersCount++;
            }
        });

        const availablePrinters = document.querySelector('.available-printers');
        availablePrinters.innerHTML = `<strong>${availablePrintersCount}</strong>`;
    };
};

export { UI }