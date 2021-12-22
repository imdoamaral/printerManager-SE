import { Toner } from '../model/Toner.js';

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
        const form = document.querySelector('#toner-form');
        container.insertBefore(div, form);

        // remove a mensagem após 3s
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    };
    
    static showToners() {
        const toners = Toner.read();
        toners.forEach((toner) => UI.addToner(toner));
    };
    
    static addToner(toner) {
        const list = document.querySelector('#toner-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${toner.id}</td>
            <td>${toner.model}</td>
            <td>${toner.quant}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            <td><a href="#" class="btn btn-info btn-sm edit">Edit</a></td>
        `

        list.appendChild(row);
    };
    
    static removeToner(element) {
        if(element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    };
};

export { UI }