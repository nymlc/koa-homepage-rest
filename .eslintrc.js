module.exports = {
    parser: "babel-eslint",
    root: true,
    parserOptions: {
        ecmaVersion: 8, //指定ECMAScript支持的版本，6为ES6，这里为了兼容async和await，设置为8
        sourceType: 'module'
    },
    extends: 'standard',
    plugins: [
        'html',
        'promise'
    ],
    env: {
        'node': true
    },
    // add your custom rules here
    'rules': {
        // 禁用 debugger
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        //禁止非必要的括号
        'no-extra-parens': ['error', 'all', {
            'nestedBinaryExpressions': false
        }],

        // 禁止使用不确定的左操作符语句
        'no-unsafe-negation': 'error',
        // 强制使用有效的 JSDoc 注释
        'valid-jsdoc': 'off',
        // 强制数组方法的回调函数中有 return 语句
        'array-callback-return': 'error',
        // 强制所有控制语句使用一致的括号风格
        curly: ['error', 'multi-line'],
        // 强制在点号之前和之后一致的换行
        'dot-location': ['error', 'property'],
        // 强制尽可能地使用点号
        'dot-notation': 'error',
        // 要求使用 === 和 !==
        'eqeqeq': ['error', 'smart'],
        // 禁用 arguments.caller 或 arguments.callee
        'no-caller': 'error',
        // 禁止出现空函数
        'no-empty-function': 'warn',
        // 禁止不必要的 .bind() 调用
        'no-extra-bind': 'error',
        // 禁用不必要的标签
        'no-extra-label': 'error',
        // 禁止数字字面量中使用前导和末尾小数点
        'no-floating-decimal': 'error',
        // 禁止给原生的对象或者只读的全局变量分配,如:undefined
        'no-global-assign': 'error',
        // 禁止使用类似 eval() 的方法
        'no-implied-eval': 'error',
        // 禁用 __iterator__ 属性
        'no-iterator': 'error',
        // 禁用不必要的嵌套块
        'no-lone-blocks': 'error',
        // 禁止使用多个空格
        'no-multi-spaces': 'error',
        // 禁止对 String，Number 和 Boolean 使用 new 操作符
        'no-new-wrappers': 'error',
        // 禁止在字符串中使用八进制转义序列
        'no-octal-escape': 'error',
        // 禁用 __proto__ 属性
        'no-proto': 'error',
        // 禁止自身比较
        'no-self-compare': 'error',
        // 禁止抛出异常字面量
        'no-throw-literal': 'error',
        // 禁止出现未使用过的表达式
        'no-unused-expressions': 'error',
        // 禁止不必要的 .call() 和 .apply()
        'no-useless-call': 'error',
        // 禁止不必要的字符串字面量或模板字面量的连接
        'no-useless-concat': 'error',
        // 禁用不必要的转义字符
        'no-useless-escape': 'error',
        // 禁用 void 操作符
        'no-void': 'error',
        // 要求 IIFE 使用括号括起来
        'wrap-iife': 'error',

        // 要求或禁止 “Yoda” 条件
        yoda: 'error',

        /*
         * Variables
         */
        // 不允许标签与变量同名
        'no-label-var': 'error',
        // 禁止初始化变量为undefined
        'no-undef-init': 'error',
        // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
        'no-undef': 'off',
        // 禁止在变量定义之前使用它们
        'no-use-before-define': 'error',

        /*
         * Node.js and CommonJS
         */
        // 禁止调用 require 时使用 new 操作符
        'no-new-require': 'error',

        /*
         * Stylistic Issues
         风格指南
         */
        // 强制数组方括号中使用一致的空格
        'array-bracket-spacing': 'error',
        // 强制在单行代码块中使用一致的空格
        'block-spacing': 'error',
        // 强制在代码块中使用一致的大括号风格
        'brace-style': ['error', '1tbs', {
            'allowSingleLine': true
        }],
        // 要求或禁止末尾逗号
        'comma-dangle': 'error',
        // 强制在逗号前后使用一致的空格
        'comma-spacing': 'error',
        // 强制使用一致的逗号风格
        'comma-style': 'error',
        // 强制在计算的属性的方括号中使用一致的空格
        'computed-property-spacing': 'error',
        // 要求或者禁止空格在方法定义和调用中间
        'func-call-spacing': 'error',
        // 强制使用一致的缩进
        indent: ['error', 4, {
            SwitchCase: 1
        }],
        // 强制在 JSX 属性中一致地使用双引号或单引号
        'jsx-quotes': 'error',
        // 强制在对象字面量的属性中键和值之间使用一致的间距
        'key-spacing': 'error',
        // 强制在关键字前后使用一致的空格
        'keyword-spacing': 'error',
        // 强制使用一致的换行风格
        'linebreak-style': 'off',
        // 'linebreak-style': ['off', 'windows'],
        // 强制或禁止在语句之间填充空格
        'padding-line-between-statements': 'error',
        // 要求构造函数首字母大写
        'new-cap': 'off',
        // 要求调用无参构造函数时有圆括号
        'new-parens': 'error',
        // 禁用 Array 构造函数
        'no-array-constructor': 'error',

        // 禁用 Object 的构造函数
        'no-new-object': 'error',

        // 禁用行尾空格
        'no-trailing-spaces': 'error',
        // 禁止可以在有更简单的可替代的表达式时使用三元操作符
        'no-unneeded-ternary': 'error',
        // 禁止属性前有空白
        'no-whitespace-before-property': 'error',
        // 强制在大括号中使用一致的空格
        'object-curly-spacing': ['error', 'always'],
        // 要求或禁止块内填充
        'padded-blocks': ['error', 'never'],
        // 要求对象字面量属性名称用引号括起来
        'quote-props': ['error', 'as-needed'],
        // 强制使用一致的反勾号、双引号或单引号
        quotes: ['error', 'single'],
        // 强制分号之前和之后使用一致的空格
        'semi-spacing': 'error',

        // 强制在块之前使用一致的空格
        'space-before-blocks': 'error',

        'no-console': 'off',
        // 强制在 function的左括号之前使用一致的空格
        'space-before-function-paren': ['error', 'never'],
        // 强制在圆括号内使用一致的空格
        'space-in-parens': 'error',
        // 要求操作符周围有空格
        'space-infix-ops': 'error',
        // 强制在一元操作符前后使用一致的空格
        'space-unary-ops': 'error',
        // 强制在注释中 // 或 /* 使用一致的空格
        'spaced-comment': 'error',
        // 要求或禁止 Unicode 字节顺序标记 (BOM)
        'unicode-bom': 'error',


        /*
         * ECMAScript 6
         */
        // 要求箭头函数体使用大括号
        'arrow-body-style': 'error',
        // 要求箭头函数的参数使用圆括号
        'arrow-parens': ['error', 'as-needed'],
        // 强制箭头函数的箭头前后使用一致的空格
        'arrow-spacing': 'error',
        // 强制 generator 函数中 * 号周围使用一致的空格
        'generator-star-spacing': ['error', 'after'],
        // 禁止类成员中出现重复的名称
        'no-duplicate-imports': 'error',
        // 禁止在对象字面量使用不必要的计算属性
        'no-useless-computed-key': 'error',
        // 禁用不必要的构造函数
        'no-useless-constructor': 'error',
        // 禁止重命名import、export和结构分配给相同的名字
        'no-useless-rename': 'error',
        // 要求使用 let 或 const 而不是 var
        'no-var': 'error',
        // 要求或禁止对象字面量中方法和属性使用简写语法
        'object-shorthand': 'error',
        // 要求使用箭头函数作为回调
        'prefer-arrow-callback': 'error',
        // 要求使用 const 声明那些声明后不再被修改的变量
        'prefer-const': 'error',
        // 禁止parseInt()八进制或者十六进制
        'prefer-numeric-literals': 'error',
        // 要求使用可扩展变量代替arguments
        'prefer-rest-params': 'error',
        // 要求使用扩展运算符而非 .apply()
        'prefer-spread': 'error',
        // 强制在可扩展和分隔运算符和他们表达式之间使用一致空格
        'rest-spread-spacing': 'error',
        // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
        'template-curly-spacing': 'error',

        // 强制在 yield* 表达式中 * 周围使用空格
        'yield-star-spacing': 'error',


        /*vue拷来*/

        'accessor-pairs': 2,
        'camelcase': [0, {
            'properties': 'always'
        }],
        // 要求在构造函数中有 super() 的调用
        'constructor-super': 2,

        // 要求或禁止文件末尾存在空行
        'eol-last': 2,
        // 要求回调函数中有容错处理
        'handle-callback-err': [2, '^(err|error)$'],
        // 禁止修改类声明的变量
        'no-class-assign': 2,
        // 禁止条件表达式中出现赋值操作符
        'no-cond-assign': 2,
        // 禁止修改 const 声明的变量
        'no-const-assign': 2,
        // 禁止在正则表达式中使用控制字符
        'no-control-regex': 2,
        // 禁止删除变量
        'no-delete-var': 2,
        // 禁止 function 定义中出现重名参数
        'no-dupe-args': 2,
        // 禁止类成员中出现重复的名称
        'no-dupe-class-members': 2,
        // 禁止对象字面量中出现重复的 key
        'no-dupe-keys': 2,
        // 禁止出现重复的 case 标签
        'no-duplicate-case': 2,
        // 禁止在正则表达式中使用空字符集
        'no-empty-character-class': 2,
        // 禁止使用空解构模式
        'no-empty-pattern': 2,
        // 禁止对 catch 子句的参数重新赋值
        'no-ex-assign': 2,
        // 禁止扩展原生类型
        'no-extend-native': 2,

        // 禁止不必要的布尔转换
        'no-extra-boolean-cast': 2,

        // 禁止 case 语句落空
        'no-fallthrough': 2,
        // 禁止对 function 声明重新赋值
        'no-func-assign': 2,
        // 禁止在嵌套的块中出现变量声明或 function 声明
        'no-inner-declarations': [2, 'functions'],

        // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
        'no-invalid-regexp': 2,
        // 禁止在字符串和注释之外不规则的空白
        'no-irregular-whitespace': 2,
        // 禁用标签语句
        'no-labels': [2, {
            'allowLoop': false,
            'allowSwitch': false
        }],
        // 禁止空格和 tab 的混合缩进
        'no-mixed-spaces-and-tabs': 2,
        // 禁止使用多行字符串
        'no-multi-str': 2,

        // 禁止出现多行空行
        'no-multiple-empty-lines': [2, {
            'max': 1
        }],

        // 禁止把全局对象作为函数调用
        'no-obj-calls': 2,
        // 禁用八进制字面量
        'no-octal': 2,
        // 禁止对 __dirname 和 __filename 进行字符串连接
        'no-path-concat': 2,
        // 禁止多次声明同一变量
        'no-redeclare': 2,

        // 禁止正则表达式字面量中出现多个空格
        'no-regex-spaces': 2,
        // 禁止在 return 语句中使用赋值语句
        'no-return-assign': [2, 'except-parens'],
        // 禁止自我赋值
        'no-self-assign': 2,
        // 禁用逗号操作符
        'no-sequences': 2,
        // 禁止将标识符定义为受限的名字
        'no-shadow-restricted-names': 2,

        // 禁用稀疏数组
        'no-sparse-arrays': 2,
        // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
        'no-this-before-super': 2,

        // 禁止出现令人困惑的多行表达式
        'no-unexpected-multiline': 2,
        // 禁用一成不变的循环条件
        'no-unmodified-loop-condition': 2,

        // 禁止在return、throw、continue 和 break 语句之后出现不可达代码
        'no-unreachable': 2,

        // 禁止在 finally 语句块中出现控制流语句
        'no-unsafe-finally': 2,
        // 禁止出现未使用过的变量
        'no-unused-vars': [2, {
            'vars': 'all',
            'args': 'none'
        }],
        // 禁用 with 语句
        'no-with': 2,

        // 强制函数中的变量要么一起声明要么分开声明
        'one-var': [2, {
            'initialized': 'never'
        }],
        // 强制操作符使用一致的换行符
        'operator-linebreak': [2, 'after', {
            'overrides': {
                '?': 'before',
                ':': 'before'
            }
        }],
        // 要求或禁止使用分号代替 ASI 
        'semi': [2, 'always'],
        // 要求使用 isNaN() 检查 NaN
        'use-isnan': 2,
        // 强制 typeof 表达式与有效的字符串进行比较
        'valid-typeof': 2
    }
}
