export function getPropsWithoutFunction(props) {
    let result = {};

    for (let key in props) {
        if (typeof props[key] !== "function") {
        	result[key] = props[key];
        }
    }

    return result;
}
