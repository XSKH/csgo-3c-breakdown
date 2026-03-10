var GRENADE_DATA = {
    "sections": ["basics","heMechanic","flashMechanic","smokeMechanic","molotovMechanic","throwMethods","carryLimit"],
    "basics": {
        "title": "投掷物基础数据",
        "columns": ["道具","价格","携带上限","效果","持续时间","引爆延迟"],
        "keys": ["item","price","limit","effect","duration","delay"],
        "data": [
            {"item":"HE手雷","price":"$300","limit":"1颗","effect":"最高98伤害(范围递减)","duration":"瞬间","delay":"拔销后~1.5s"},
            {"item":"闪光弹","price":"$200","limit":"2颗","effect":"致盲","duration":"~1~3.5s","delay":"拔销后~1.5s"},
            {"item":"烟雾弹","price":"$300","limit":"1颗","effect":"遮挡视野","duration":"~18s","delay":"落地后~0.5s"},
            {"item":"燃烧弹(T-Molotov)","price":"$400","limit":"1颗","effect":"~40 DPS范围伤害","duration":"~7s","delay":"落地即引燃"},
            {"item":"燃烧弹(CT-Incendiary)","price":"$600","limit":"1颗","effect":"~40 DPS范围伤害","duration":"~7s","delay":"落地即引燃"},
            {"item":"诱饵弹","price":"$50","limit":"1颗","effect":"模拟枪声","duration":"~15s","delay":"落地后开始"}
        ]
    },
    "heMechanic": {
        "title": "HE手雷详细机制",
        "columns": ["属性","数值","说明"],
        "keys": ["attr","value","desc"],
        "data": [
            {"attr":"最大伤害","value":"98（无甲）/ 57（有甲）","desc":"贴脸爆炸"},
            {"attr":"伤害半径","value":"~350 units","desc":"超出范围无伤害"},
            {"attr":"伤害衰减","value":"线性递减","desc":"距爆炸点越远伤害越低"},
            {"attr":"护甲减伤","value":"约42%","desc":"有甲约减免42%伤害"},
            {"attr":"队友伤害","value":"竞技模式有效","desc":"可炸伤队友"},
            {"attr":"自伤","value":"有","desc":"可炸伤自己"}
        ]
    },
    "flashMechanic": {
        "title": "闪光弹详细机制",
        "columns": ["条件","致盲时间","说明"],
        "keys": ["condition","blindTime","desc"],
        "data": [
            {"condition":"正面直视（近距离）","blindTime":"~3.0~3.5s","desc":"全白，完全看不见"},
            {"condition":"正面直视（远距离）","blindTime":"~2.0~2.5s","desc":"距离越远效果减弱"},
            {"condition":"侧面","blindTime":"~1.0~2.0s","desc":"部分致盲"},
            {"condition":"背对","blindTime":"~0.5~1.0s","desc":"轻微致盲或无效"},
            {"condition":"完全遮挡","blindTime":"0s","desc":"墙体完全遮挡则无效"}
        ]
    },
    "smokeMechanic": {
        "title": "烟雾弹详细机制",
        "columns": ["属性","数值","说明"],
        "keys": ["attr","value","desc"],
        "data": [
            {"attr":"持续时间","value":"~18s","desc":"从完全展开到消散"},
            {"attr":"扩散时间","value":"~0.5s","desc":"引爆到完全展开"},
            {"attr":"烟雾半径","value":"~288 units","desc":"球形范围"},
            {"attr":"One-way smoke","value":"—","desc":"利用烟雾边缘高度差单向透视"},
            {"attr":"与燃烧弹交互","value":"烟灭火","desc":"烟雾弹可熄灭范围内燃烧弹火焰"},
            {"attr":"弹道","value":"受重力影响","desc":"可反弹（2次），需练习定点烟"}
        ]
    },
    "molotovMechanic": {
        "title": "燃烧弹详细机制",
        "columns": ["属性","数值","说明"],
        "keys": ["attr","value","desc"],
        "htmlKeys": ["attr"],
        "data": [
            {"attr":"<span class=\"term\" data-tip=\"DPS = Damage Per Second，每秒造成的伤害值\">DPS</span>（每秒伤害）","value":"~40 HP/s","desc":"站在火中持续受伤"},
            {"attr":"持续时间","value":"~7s","desc":"—"},
            {"attr":"范围","value":"圆形，会向低处蔓延","desc":"楼梯/斜面火焰向下扩散"},
            {"attr":"T方Molotov","value":"$400","desc":"瓶身，投掷弧度不同"},
            {"attr":"CT方Incendiary","value":"$600","desc":"更贵但效果相同"},
            {"attr":"护甲减伤","value":"有（轻微）","desc":"护甲可略微降低火焰伤害"},
            {"attr":"烟雾弹交互","value":"可被烟灭","desc":"在火上扔烟雾弹可熄灭"},
            {"attr":"队友伤害(T)","value":"T方Molotov伤队友","desc":"竞技模式下T的Molotov伤害队友"}
        ]
    },
    "throwMethods": {
        "title": "投掷方式",
        "columns": ["按键","方式","距离","说明"],
        "keys": ["key","method","range","desc"],
        "data": [
            {"key":"左键","method":"远投","range":"最远","desc":"标准投掷，抛物线最高"},
            {"key":"右键","method":"近投","range":"最近","desc":"脚下/近距离投掷"},
            {"key":"左+右键","method":"中投","range":"中等","desc":"中等距离，抛物线较平"},
            {"key":"移动+跳跃投","method":"跳投","range":"更远+更高","desc":"借助跳跃惯性增加距离（可绑定键）"}
        ]
    },
    "carryLimit": {
        "title": "竞技模式投掷物上限",
        "columns": ["总携带上限","组合示例"],
        "keys": ["limit","example"],
        "data": [
            {"limit":"最多4颗（含闪光弹×2）","example":"1烟+2闪+1火 / 1烟+1闪+1HE+1火"}
        ]
    }
};
