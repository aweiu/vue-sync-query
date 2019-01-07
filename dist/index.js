import { someOf } from './utils';
export default {
    install(Vue) {
        Vue.prototype.$syncQuery = function (path, options) {
            let changedBySelf = false;
            const defaultDataVal = this[path];
            const queryToData = (queryVal) => {
                if (this._inactive)
                    return;
                if (changedBySelf)
                    return (changedBySelf = false);
                changedBySelf = true;
                this[path] = this.$route.query.hasOwnProperty(path) ? (options && options.queryToData ? options.queryToData(queryVal) : queryVal) : defaultDataVal;
            };
            // 监听 data
            this.$watch(path, (dataVal) => {
                if (this._inactive)
                    return;
                if (changedBySelf)
                    return (changedBySelf = false);
                changedBySelf = true;
                const queryVal = options && options.dataToQuery ? options.dataToQuery(dataVal) : dataVal;
                if (options && options.include) {
                    this.$router.push({ query: Object.assign(someOf(this.$route.query, options.include), { [path]: queryVal }) });
                }
                else {
                    const query = Object.assign({}, this.$route.query, { [path]: queryVal });
                    if (options && options.exclude) {
                        for (let key of options.exclude)
                            delete query[key];
                    }
                    this.$router.push({ query });
                }
            });
            // 监听 query
            this.$watch('$route.query.' + path, queryToData);
            // 初始化 data
            queryToData(this.$route.query[path]);
            this.$nextTick(() => (changedBySelf = false));
        };
    }
};
