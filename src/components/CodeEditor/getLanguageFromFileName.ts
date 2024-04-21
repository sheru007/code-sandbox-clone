export const getLanguageFromFileName = (fileName: string) => {
    const extension = fileName.split('.').pop();
    switch (extension) {
        case 'ts':
        case 'tsx':
            return 'typescript';
        case 'js':
        case 'jsx':
            return 'javascript';
        case 'json':
            return 'json';
        case 'html':
            return 'html';
        default:
            return 'plaintext';
    }
};