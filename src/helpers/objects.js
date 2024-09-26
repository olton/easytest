export const deepEqual = (x, y) => {
    if (x === y) {
        return true;
    }
    else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
        if (Object.keys(x).length !== Object.keys(y).length) return false;
        for (const prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (! objects(x[prop], y[prop]) || x[prop] !== y[prop])
                    return false;
            } else
                return false;
        }
        return true;
    }
    return false;
}

export const equalStruct = (x, y) => {
    if (x === y) {
        return true;
    }
    else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
        if (Object.keys(x).length !== Object.keys(y).length) return false;
        for (const prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (! deepEqualWithValue(x[prop], y[prop]))
                    return false;
            } else
                return false;
        }
        return true;
    }
    return false;
}