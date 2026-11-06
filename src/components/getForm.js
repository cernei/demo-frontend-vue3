import * as ordersForm from "./Orders/form.js";
import * as stockLocationsForm from "./StockLocations/form.js";
import * as stockItemsForm from "./StockItems/form.js";
import * as productsForm from "./Products/form.js";
import * as categoriesForm from "./Categories/form.js";
import * as adminsFormCreate from "./Admins/formCreate.js";
import * as adminsFormUpdate from "./Admins/formUpdate.js";
import * as rolesForm from "./Roles/form.js";

const moduleMap = {
    'orders.create': {module: ordersForm},
    'orders.edit': {module: ordersForm},

    'stock-locations.create': {module: stockLocationsForm},
    'stock-locations.edit': {module: stockLocationsForm},

    'stock-items.create': {module: stockItemsForm},
    'stock-items.edit': {module: stockItemsForm},

    'products.create': {module: productsForm},
    'products.edit': {module: productsForm},

    'categories.create': {module: categoriesForm},
    'categories.edit': {module: categoriesForm},

    'admins.create': {module: adminsFormCreate},
    'admins.edit': {module: adminsFormUpdate},

    'roles.create': {module: rolesForm},
    'roles.edit': {module: rolesForm},
};
function toSingular(plural) {
    // Regular rules for forming singular nouns
    if (plural.endsWith('ies')) {
        return plural.slice(0, -3) + 'y';
    } else if (plural.endsWith('s')) {
        return plural.slice(0, -1);
    }

    // If no specific rule matches, return the input unchanged
    return plural;
}

export function getForm(moduleName) {
    if (!moduleMap[moduleName])
        throw "cannot find module " + moduleName;
    const selectedModule = moduleMap[moduleName].module;
    const plural = moduleName.split('.')[0];
    return selectedModule
        ? {
            layout: selectedModule.layout,
            config: selectedModule.config,
            initialState: selectedModule.initialState,
            url: plural,
            entityName: toSingular(plural)
        }
        : null; // Or handle the case when the module is not found
}