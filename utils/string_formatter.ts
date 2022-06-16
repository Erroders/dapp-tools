// special characters -> https://stackoverflow.com/questions/6555182/remove-all-special-characters-except-space-from-a-string-using-javascript
// white spaces ->https://stackoverflow.com/questions/6623231/remove-all-white-spaces-from-text
export function formatContractName(str: string): string {
    // convert everything into lowercase
    str = str.replace(/[&\/\\#,+()$~%.@'":*?<>{}]/g, '');
    // str = str.replace(/[^a-z0-9]*([a-z0-9])([a-z0-9]*)/gi, (m, u, l) => u.toUpperCase() + l.toLowerCase() + ' ');
    str = str.replaceAll(/\s/g, '');
    return str;
}

// https://stackoverflow.com/questions/59934393/typescript-string-format-does-not-exist
export function stringFormat(template: string, ...args: any[]) {
    return template.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
}
