import { Storage } from './Storage.js';

class Department {
    constructor(id, name, inCharge) {
        this.id = id;
        this.name = name;
        this.inCharge = inCharge;
    };

    // ----- CRUD -----

    static create(department) {
        const departments = Storage.getDepartments();

        departments.push(department);
        Storage.setDepartments(departments);
    };

    static read() {
        return Storage.getDepartments();
    };

    static update(updatedDepartment, id) {
        const departments = Storage.getDepartments();

        departments.forEach((department, index) => {
            if(department.id === id) {
                departments[index] = updatedDepartment;
            }
        });

        Storage.setDepartments(departments);
    };

    static delete(id) {
        const departments = Storage.getDepartments();

        departments.forEach((department, index) => {
            if(department.id == id) {
                departments.splice(index, 1);
            }
        });

        Storage.setDepartments(departments);
    };
};

export { Department }