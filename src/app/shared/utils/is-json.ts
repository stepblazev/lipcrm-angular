export function isJSON(line: string): boolean {
    try {
        JSON.parse(line);
        return true;
    } catch (e) {
        return false;
    }
}