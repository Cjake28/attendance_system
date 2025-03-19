/**
 * Formats a name by capitalizing the first letter of each word.
 * 
 * @param {string} name - The name to be formatted.
 * @returns {string} - The formatted name with each word capitalized.
 * 
 * @example
 * formatName("john erasmus marie m. burgos");
 * // Output: "John Erasmus Marie M. Burgos"
 * 
 * formatName("  alice   bob CHARLES  ");
 * // Output: "Alice Bob Charles"
 */
export const formatName = (name) => 
    name
        .trim()  // Removes leading and trailing whitespace
        .split(" ")  // Splits the string into an array of words by spaces
        .map(word => 
            word.charAt(0).toUpperCase() +  // Capitalizes the first letter
            word.slice(1)  // Appends the rest of the word
        )
        .join(" ");  // Joins the array back into a string separated by spaces

// Example usage
//console.log(formatName("john erasmus marie m. burgos"));  // "John Erasmus Marie M. Burgos"
//console.log(formatName("  alice   bob CHARLES  "));        // "Alice Bob Charles"
