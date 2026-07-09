/**
 * Inserts an item into an array at a specific position.
 *
 * @param {Array} array - The array to insert the item into.
 * @param {number} position - The position at which to insert the item.
 * @param {*} item - The item to be inserted.
 */
export function pushWithPosition(array, position, item) {
    if (position < 0 || position > array.length) {
        throw new Error('Invalid position');
    }
    return [...array.slice(0, position), item, ...array.slice(position, array.length)];
}


/**
 * Removes an item from an array at a specific position.
 *
 * @param {Array} array - The array to remove the item from.
 * @param {number} position - The position at which to remove the item.
 * @returns {*} - The removed item.
 */
export function popWithPosition(array, position) {
    if (position < 0 || position >= array.length) {
        throw new Error('Invalid position');
    }
    array.splice(position, 1);
    return array;
}