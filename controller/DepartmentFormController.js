import { UI } from './DepartmentUIController.js';
import { Department } from '../model/Department.js';

class Form {
    static getValues() {
        return {
            name: document.querySelector('#departmentName').value,
            inCharge: document.querySelector('#inChargeDepartment').value
        }
    };

    static validateFields() {
        const { name, inCharge } = this.getValues();

        if(name === '' || inCharge === '') {
            UI.showAlert('Por favor, preencha todos os campos', 'danger');
            return false;
        }
        return true;
    };

    static clearFields() {
        document.querySelector('#departmentName').value = '';
        document.querySelector('#inChargeDepartment').value = '';
    };

    static submit(event) {
        event.preventDefault();

        try {
            const isValid = this.validateFields();

            if(isValid) {
                const { name, inCharge } = this.getValues();

                const departments = Department.read();
                const id = departments.length;
    
                const department = new Department(id, name, inCharge);
    
                Department.create(department);
    
                UI.addDepartment(department);
    
                UI.showAlert('Departamento adicionado', 'success');
    
                this.clearFields();
            }
            
        } catch (error) {
            alert(error.message);
        }
    };
};

export { Form }