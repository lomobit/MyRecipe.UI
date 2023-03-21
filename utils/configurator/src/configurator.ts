/**
 * Примеры использования:
 *      1) node configurator --configPath="configs/.env.debug" --destinationPath="../../../.env" [--notUseParentConfigs]
 *      2) node configurator --help
 *
 * --configPath= (*)
 *      [ОБЯЗАТЕЛЬНЫЙ] Путь применяемой конфигурации приложения.
 *
 * --destinationPath= (*)
 *      [ОБЯЗАТЕЛЬНЫЙ] Путь, куда будет складываться итоговая конфигурация после трансформации.
 *
 * --notUseParentConfigs
 *      Параметр, указыавющий, что к применяемой трансформации, не нужно добавлять ключи из родительских трансформаций.
 *
 * --help
 *      Сводка команд.
 * 
 */

import os from 'os';
import fs from 'fs';
import path from 'path';

import {
    needHelpParameter,
    notUseParentConfigsParameter,
    configPathParameter,
    destinationPathParameter,
    errorsOutput,
    errorValidationDuplicatedParameter,
    errorValidationIncorrectUsingParameter,
    errorValidationRequiredParameters, errorValidationUnknownParameters,
    helpSummary,
    successMessage,
} from "./constants";


if (process.argv.length < 3) {
    console.error(errorValidationRequiredParameters([configPathParameter, destinationPathParameter]));
}

let needHelp: boolean = false;
let notUseParentConfigs: boolean = false;
let configPath: string = undefined;
let destinationPath: string = undefined;

let unknownArguments: Array<string> = [];
let validationErrors: Array<string> = [];

for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === needHelpParameter) {
        if (needHelp !== false) {
            validationErrors.push(errorValidationDuplicatedParameter(needHelpParameter));
            continue;
        }

        needHelp = true;
    }
    else if (process.argv[i] === notUseParentConfigsParameter) {
        if (notUseParentConfigs !== false) {
            validationErrors.push(errorValidationDuplicatedParameter(notUseParentConfigsParameter));
            continue;
        }

        notUseParentConfigs = true;
    }
    else if (process.argv[i].startsWith(configPathParameter)) {
        if (configPath !== undefined) {
            validationErrors.push(errorValidationDuplicatedParameter(configPathParameter));
            continue;
        }

        configPath = process.argv[i].substring(configPathParameter.length);
    }
    else if (process.argv[i].startsWith(destinationPathParameter)) {
        if (destinationPath !== undefined) {
            validationErrors.push(errorValidationDuplicatedParameter(destinationPathParameter));
            continue;
        }

        destinationPath = process.argv[i].substring(destinationPathParameter.length);
    }
    else {
        unknownArguments.push(process.argv[i]);
    }
}

if (unknownArguments.length > 0) {
    validationErrors.push(errorValidationUnknownParameters(unknownArguments));
}

if (validationErrors.length > 0) {
    console.error(errorsOutput(validationErrors));
    process.exit(-1);
}

if (needHelp) {
    if (process.argv.length > 3) {
        console.error(errorsOutput([errorValidationIncorrectUsingParameter(needHelpParameter)]));
        process.exit(-1);
    }
    else {
        console.info(helpSummary);
        process.exit(0);
    }
}

let emptyRequiredParameters: Array<string> = [];
if (configPath === undefined || configPath === "") {
    emptyRequiredParameters.push(configPathParameter);
}

if (destinationPath === undefined || destinationPath === "") {
    emptyRequiredParameters.push(destinationPathParameter);
}

if (emptyRequiredParameters.length > 0) {
    console.error(errorsOutput([errorValidationRequiredParameters(emptyRequiredParameters)]));
    process.exit(-1);
}

if (notUseParentConfigs) {
    try {
        fs.copyFileSync(configPath, destinationPath);
        console.info(successMessage);
        process.exit(0);
    }
    catch (ex) {
        console.error(errorsOutput([ex]));
        process.exit(-1);
    }
}


let configFileName: string = path.basename(configPath);
let configFolderName: string = path.dirname(configPath);

let configFileNameParts: Array<string> = configFileName.split(".").slice(1);
let configFileNames: Array<string> = [];

let configKeyValue = new Map<string, string>();

configFileNames.push(`.${configFileNameParts[0]}`);
for (let i = 1; i < configFileNameParts.length; i++) {
    configFileNames.push(`${configFileNames[i - 1]}.${configFileNameParts[i]}`);
}

for (let i = 0; i < configFileNames.length; i++) {
    try {
        let currentConfigFile = fs.readFileSync(path.join(configFolderName, configFileNames[i]), { encoding:'utf8', flag: 'r' });

        currentConfigFile.split(os.EOL).forEach(keyValueString => {
            let keyValueArray = keyValueString.split("=");
            configKeyValue.set(keyValueArray[0], keyValueArray[1]);
        });
    }
    catch (ex) {
        console.error(errorsOutput([ex]));
    }
}

let resultConfigFileString: string = "";
for (let key of configKeyValue.keys()) {
    resultConfigFileString += `${key}=${configKeyValue.get(key)}${os.EOL}`;
}

try {
    fs.writeFileSync(destinationPath, resultConfigFileString, { encoding:'utf8', flag: 'w' });
}
catch (ex) {
    console.error(errorsOutput([ex]));
    process.exit(-1);
}

console.info(successMessage);
process.exit(0);
