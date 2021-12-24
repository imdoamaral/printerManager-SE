import {Storage } from './Storage.js';

class Proprietor {
    constructor(id, name, contact) {
        this.id = id;
        this.name = name;
        this.contact = contact;
    }

    // ----- CRUD -----

    static create(proprietor) {
        const proprietors = Storage.getProprietors();

        proprietors.push(proprietor);
        Storage.setProprietors(proprietors);
    };

    static read() {
        return Storage.getProprietors();
    };

    static update(updatedProprietor, receivedId) {
        const proprietors = Storage.getProprietors();

        proprietors.forEach((proprietor, index) => {
            if(proprietor.id === receivedId) {
                proprietors[index] = updatedProprietor;
            }
        });

        Storage.setProprietors(proprietors);
    };

    static delete(receivedId) {
        const proprietors = Storage.getProprietors();

        proprietors.forEach((proprietor, index) => {
            if(proprietor.id == receivedId) {
                proprietors.splice(index, 1);
            }
        });

        Storage.setProprietors(proprietors);
    };
};

export { Proprietor }