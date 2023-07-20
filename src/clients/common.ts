export const checkSuccess = async (res: Response) => {
    let result = res.json();
    if (res.ok) {
        return result;
    }

    let errorResult = await result;
    throw new Error(`${errorResult.messages[0].value}`);
}

export const showError = async (error: any) => {
    alert(`${error}`);
    return {
        success: false
    };
}