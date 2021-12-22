class Storage {

    // Impressora
    static getPrinters() {
        return JSON.parse(localStorage.getItem('printers')) || [];
    };

    static setPrinters(printers) {
        localStorage.setItem('printers', JSON.stringify(printers));
    };

    // Toner
    static getToners() {
        return JSON.parse(localStorage.getItem('toners')) || [];
    }

    static setToners(toners) {
        localStorage.setItem('toners', JSON.stringify(toners));
    }

    // Departamento
    static getDepartments() {
        return JSON.parse(localStorage.getItem('departments')) || [];
    };

    static setDepartments(departments) {
        localStorage.setItem('departments', JSON.stringify(departments));
    };

    // Proprietário
};

export { Storage }