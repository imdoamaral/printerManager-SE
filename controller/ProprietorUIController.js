import { Proprietor } from '../model/Proprietor.js';

class UI {
    static showAlert(text, className) {
        // <div class="alert alert-danger/alert-success">Mensagem</div>
        const div = document.createElement('div');

        // prepara a estrutura pra receber o nome da classe ('success' ou 'danger')
        div.className = `alert alert-${className}`;

        // insere algo dentro do campo 'mensagem'
        div.appendChild(document.createTextNode(text));

        // insere a mensagem de alerta antes do form
        const container = document.querySelector('.container');
        const form = document.querySelector('#proprietor-form');

        container.insertBefore(div, form);

        // Remove a mensagem após 3s
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    };

    static showProprietors() {
        const proprietors = Proprietor.read();

        proprietors.forEach((proprietor) => UI.addProprietor(proprietor));
    };

    static addProprietor(proprietor) {
        const list = document.querySelector('#proprietor-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${proprietor.id}</td>
            <td>${proprietor.name}</td>
            <td>${proprietor.contact}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            <td><a href="#" class="btn btn-info btn-sm edit">Edit</a></td>
        `
        list.appendChild(row);
    };

    static removeProprietor(element) {
        if(element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    };
};

export { UI }