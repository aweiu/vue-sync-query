export function someOf(obj, keys) {
    const rs = {};
    for (let key of keys) {
        if (obj.hasOwnProperty(key))
            rs[key] = obj[key];
    }
    return rs;
}
