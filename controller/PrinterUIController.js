import { Printer } from '../model/Printer.js';
import { Toner } from '../model/Toner.js'

class UI {
    
    static showAlert(text, className) {
        // <div class="alert alert-danger/alert-success">Mensagem</div>
        const div = document.createElement('div');

        // prepara a estrutura pra receber o nome da classe ('success', 'danger', etc)
        div.className = `alert alert-${className}`;

        // insere algo dentro do campo 'mensagem'
        div.appendChild(document.createTextNode(text));

        // insere a mensagem de alerta antes do form
        const container = document.querySelector('.container');
        const form = document.querySelector('#printer-form');
        container.insertBefore(div, form);

        // Remove a mensagem após 3s
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    };

    static showPrinters() {
        const printers = Printer.read();

        printers.forEach((printer) => UI.addPrinter(printer));
    };

    static addPrinter(printer) {
        const list = document.querySelector('#printer-list');

        const row = document.createElement('tr');

        // Obtém a quantidade de toners disponíveis para dada impressora
        let tonerQuant;

        const toners = Toner.read();

        toners.forEach((toner) => {
            if(toner.model == printer.tonerModel) {
                tonerQuant = parseInt(toner.quant);
            }
        });

        // UX = melhorando a experiência do usuário com caracteres intuitivos
        if(tonerQuant === undefined) tonerQuant = 0;
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
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            <td><a href="#" class="btn btn-info btn-sm edit">Edit</a></td>
        `
        list.appendChild(row);
    };

    static removePrinter(element) {
        if(element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    };
};

export { UI }