import { Storage } from './Storage.js';

class Toner {
    constructor(id, model, quant) {
        this.id = id;
        this.model = model;
        this.quant = quant;
    };

    // ----- CRUD -----

    static create(toner) {
        const toners = Storage.getToners();
        toners.push(toner);
        Storage.setToners(toners);
    };

    static read() {
        return Storage.getToners();
    };

    static update(updatedToner, receivedId) {
        const toners = Storage.getToners();

        toners.forEach((toner, index) => {
            if(toner.id === receivedId) {
                toners[index] = updatedToner;
            }
        });

        Storage.setToners(toners);
    };

    static delete(receivedId) {
        const toners = Storage.getToners();

        toners.forEach((toner, index) => {
            if(toner.id == receivedId) {
                toners.splice(index, 1);
            }
        });

        Storage.setToners(toners);
    };
};

export { Toner }