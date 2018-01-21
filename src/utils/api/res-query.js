
import _ from 'lodash';
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
    parse(source) {
        const { data, fields, sort, page, rows } = source;
        const condition = new Conditions();
        const conditions = condition.toConditions(data);
        const _fields = {};
        fields && fields.split(',').forEach(filed => {
            _fields[filed] = 1;
        });
        const _sort = {};
        sort && sort.split(',').forEach(s => {
            const rs = s.match(/^(\+|-)?(.*)/);
            _sort[res[2]] = rs[1] === '-' ? -1 : 1;
        });
        const skip = (page - 1) * rows;
        return {
            conditions,
            fileds: _fields,
            sort: _sort,
            skip,
            limit: page
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
        return _.merge(andObj, { $or: orArr });
    }
    // 将queryparams转为conditions
    toConditions(queryParam) {
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
            return this._assemblyConditions();
        }
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
}
export {
    Parameters, QueryParams, Conditions
};
