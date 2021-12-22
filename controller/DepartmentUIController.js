import { Department } from '../model/Department.js';

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
        const form = document.querySelector('#department-form');
        container.insertBefore(div, form);

        // Remove a mensagem após 3s
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    };

    static showDepartments() {
        const departments = Department.read();

        departments.forEach((department) => UI.addDepartment(department));
    };

    static addDepartment(department) {
        const list = document.querySelector('#department-list');

        const row = document.createElement('tr');

        // const id = Department.getId(department);
        // department.id = id;

        row.innerHTML = `
            <td>${department.id}</td>
            <td>${department.name}</td>
            <td>${department.inCharge}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            <td><a href="#" class="btn btn-info btn-sm edit">Edit</a></td>
        `
        list.appendChild(row);
    };

    static removeDepartment(element) {
        if(element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    };
};

export { UI }