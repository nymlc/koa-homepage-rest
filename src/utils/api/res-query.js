
import _ from 'lodash';
import mongoose from 'mongoose';
const Parameters = {
    DEL: 'del',
    FIELDS: 'fields',
    SORT: 'sort',
    PAGE: 'page',
    ROWS: 'rows',
    DATA: 'data'
};
class QueryParams {
    constructor() {
        this.map = new Map();
    }

    putSingle(key, value) {
        this.map.set(key, value);
    }
    toString() {
        let result = '';
        for (const [key, value] of this.map) {
            result += `${key}=${value}&`;
        }
        result = result.replace(/&$/, '');
        return result ? `?${result}` : result;
    }
    toQuery(string) {
        string = decodeURI(string);
        const reg1 = /(?:\?|&|^)([^=]*)=([^&]*)(?=&|$)/g;
        const reg2 = /^(?:\?|&|^)([^=]*)=([^&]*)(?=&|$)$/;
        const rs = string.match(reg1);
        const result = {};
        rs.forEach(o => {
            const _rs = o.match(reg2);
            result[_rs[1]] = _rs[2];
        });
        return result;
    }
    isValidate(source, modelName) {
        const { data, fields, sort, page, rows } = source;
        if (fields && !Conditions.isValidateFieldName(fields.split(','), modelName)) {
            return false;
        }
        if (sort && !Conditions.isValidateFieldName(sort.replace(/[+-]/g, '').split(','), modelName)) {
            return false;
        }
        // 若不能转为数字
        if ((page && isNaN(+page)) || (rows && isNaN(+rows))) {
            return false;
        }
        if (data) {
            let queryParam;
            try {
                queryParam = JSON.parse(data);
            } catch (error) {
                return false;
            }
            const set = new Set();
            if ({}.toString.apply(queryParam) === '[object Array]') {
                queryParam.forEach(o => {
                    set.add(o.field);
                });
            } else {
                const { and, or } = queryParam;
                and && and.forEach(o => {
                    set.add(o.field);
                });
                or && or.forEach(o => {
                    set.add(o.field);
                });
            }
            return Conditions.isValidateFieldName(Array.from(set), modelName);
        }
        return true;
    }
    static parseQueryString(queryString, modelName) {
        const obj = new QueryParams();
        const source = obj.toQuery(queryString);
        if (obj.isValidate(source, modelName)) {
            const option = obj.parseQuery(source);
            return option;
        }
        return false;
    }
    parseQuery(source) {
        const { data, fields, sort, page, rows } = source;
        const condition = new Conditions();
        let conditionObj;
        try {
            conditionObj = JSON.parse(data);
        } catch (error) {
            conditionObj = null;
        }
        const conditions = condition.toConditions(conditionObj);
        const _fields = {};
        fields && fields.split(',').forEach(filed => {
            _fields[filed] = 1;
        });
        const _sort = {};
        sort && sort.split(',').forEach(s => {
            const rs = s.match(/^(\+|-)?(.*)/);
            _sort[rs[2]] = rs[1] === '-' ? -1 : 1;
        });
        const skip = (+page - 1) * +rows;
        return {
            conditions,
            fields: _fields,
            sort: _sort,
            skip,
            limit: +rows
        };
    }
}

class Conditions {
    static ops = [{
        op: '>',
        dbOP: '$gt'
    }, {
        op: '>=',
        dbOP: '$gte'
    }, {
        op: '<',
        dbOP: '$lt'
    }, {
        op: '<=',
        dbOP: '$lte'
    }, {
        op: '!=',
        dbOP: '$ne'
    }, {
        op: '=',
        dbOP: '$eq'
    }];
    // 存储condition
    andCArr = [];
    orCArr = [];
    // 存储queryparam
    andQArr = [];
    orQArr = [];

    putSingle(field, op, value, isOr = false) {
        (isOr ? this.orQArr : this.andQArr).push({
            field, op, value
        });
    }
    // 将queryparam转为condition
    _toCondition(o, isOr) {
        const { field, op, value } = o;
        for (const o of Conditions.ops) {
            if (op === o.op || op === o.dbOP) {
                (isOr ? this.orCArr : this.andCArr).push({
                    [field]: {
                        [o.dbOP]: value
                    }
                });
                break;
            }
        }
    }
    // 组装conditions
    _assemblyConditions() {
        const andObj = {};
        const orObj = {};
        const orArr = [];
        this.andCArr.forEach(o => {
            _.merge(andObj, o);
        });
        this.orCArr.forEach(o => {
            _.merge(orObj, o);
        });
        for (const key in orObj) {
            orArr.push({
                [key]: orObj[key]
            });
        }
        if (orArr.length) {
            return _.merge(andObj, { $or: orArr });
        } else {
            return andObj;
        }
    }
    // 将queryparams转为conditions
    toConditions(queryParam) {
        if (!queryParam) {
            return null;
        }
        if ({}.toString.apply(queryParam) === '[object Array]') {
            queryParam.forEach(o => {
                this._toCondition(o);
            });
        } else {
            const { and, or } = queryParam;
            and && and.forEach(o => {
                this._toCondition(o);
            });
            or && or.forEach(o => {
                this._toCondition(o, true);
            });
        }
        return this._assemblyConditions();
    }
    // 去重condition
    _merge(arr) {
        const result = _.merge([], arr);
        arr.forEach((o, i) => {
            for (let j = i + 1, l = arr.length; j < l; j++) {
                const oo = arr[j];
                if (o.field === oo.field && o.op === oo.op) {
                    result.splice(i, 1);
                }
            }
        });
        return result;
    }
    // 将condition转为queryparams
    toQueryParam() {
        let result;
        const and = this._merge(this.andQArr);
        const or = this._merge(this.orQArr);
        if (!or.length) {
            result = and;
        } else {
            result = {
                and, or
            };
        }
        return JSON.stringify(result);
    }
    static isValidateFieldName(conditions, modelName) {
        const fieldNames = Object.keys(mongoose.models[modelName].schema.paths);
        for (const c of conditions) {
            if (fieldNames.some(fieldName => c === fieldName)) {
                continue;
            } else {
                return false;
            }
        }
        return true;
    }
}
export {
    Parameters, QueryParams, Conditions
};
