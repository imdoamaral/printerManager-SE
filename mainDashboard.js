import { UI } from './controller/DashboardUIController.js'

// Chamada das funções do controller
document.addEventListener('DOMContentLoaded', UI.showPrinters);
document.addEventListener('DOMContentLoaded', UI.showTotalPrinters);
document.addEventListener('DOMContentLoaded', UI.showInUsePrinters);
document.addEventListener('DOMContentLoaded', UI.showAvailablePrinters);