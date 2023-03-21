export const needHelpParameter = "--help";
export const notUseParentConfigsParameter = "--notUseParentConfigs";
export const configPathParameter = "--configPath=";
export const destinationPathParameter = "--destinationPath=";

export const errorValidationRequiredParameters = (parameters: Array<string>): string =>
    `Не переданы обязательные параметры: ${parameters.join(", ")}. Для вызова справки используйте параметр ${needHelpParameter}.`;
export const errorValidationUnknownParameters = (parameters: Array<string>): string =>
    `Переданы неизвестные параметры: ${parameters.join(", ")}. Для вызова справки используйте параметр ${needHelpParameter}.`;
export const errorValidationDuplicatedParameter = (parameter: string): string =>
    `Многократное указание параметра: ${parameter}`;
export const errorValidationIncorrectUsingParameter = (parameter: string): string =>
    `Некорректное использование параметра: ${parameter}. Для вызова справки используйте параметр ${needHelpParameter}.`;
export const errorsOutput = (errors: Array<string>): string =>
    `[Ошибки]:\n\t- ${errors.join("\n\t- ")}`;

export const successMessage = `Трансформация конфигурации успешно завершена.`;
export const helpSummary: string = `Примеры использования:
    1) node configurator ${configPathParameter}"configs/.env.debug" ${destinationPathParameter}"../../../.env" [${notUseParentConfigsParameter}]
    2) node configurator ${needHelpParameter}\n
${configPathParameter} (*)
    [ОБЯЗАТЕЛЬНЫЙ] Путь применяемой конфигурации приложения.\n
${destinationPathParameter} (*)
    [ОБЯЗАТЕЛЬНЫЙ] Путь, куда будет складываться итоговая конфигурация после трансформации.\n
${notUseParentConfigsParameter}
    Параметр, указыавющий, что к применяемой трансформации, не нужно добавлять ключи из родительских трансформаций.\n
${needHelpParameter}
    Сводка команд.`;