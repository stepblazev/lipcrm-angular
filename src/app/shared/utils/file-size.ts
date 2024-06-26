export function getFileSize(bytes: number): string {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;
    const gigabyte = megabyte * 1024;

    if (bytes < kilobyte) {
        return `${bytes} Б`;
    } else if (bytes < megabyte) {
        return `${(bytes / kilobyte).toFixed(2)} КБ`;
    } else if (bytes < gigabyte) {
        return `${(bytes / megabyte).toFixed(2)} МБ`;
    } else {
        return `${(bytes / gigabyte).toFixed(2)} ГБ`;
    }
}