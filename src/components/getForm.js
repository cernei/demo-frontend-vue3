import * as postsForm from "./Posts/form.js";
import * as categoriesForm from "./Categories/form.js";
import * as usersFormCreate from "./Users/formCreate.js";
import * as usersFormUpdate from "./Users/formUpdate.js";
import * as rolesForm from "./Roles/form.js";

const moduleMap = {
    'posts.create': {module: postsForm},
    'posts.edit': {module: postsForm},

    'categories.create': {module: categoriesForm},
    'categories.edit': {module: categoriesForm},

    'users.create': {module: usersFormCreate},
    'users.edit': {module: usersFormUpdate},

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