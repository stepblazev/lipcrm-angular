export function arraysEqual(a: number[], b: number[]): boolean {
    if (a.length !== b.length) return false;
    
    const setA = new Set(a);
    const setB = new Set(b);
    
    if (setA.size !== setB.size) return false;
    
    for (let item of setA) {
        if (!setB.has(item)) return false;
    }
    
    return true;
}