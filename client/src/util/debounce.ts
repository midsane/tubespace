export const debounce = (func: (...args: any) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (...args: any) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func(...args), delay)
    }
}