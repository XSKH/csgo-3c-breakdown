var ECONOMY_DATA = {
    "sections": ["roundReward","lossBonus","moneyRules","killReward","equipPrice","econStrategy"],
    "roundReward": {
        "title": "回合胜负奖励（竞技模式）",
        "columns": ["情况","金额","说明"],
        "keys": ["situation","amount","desc"],
        "data": [
            {"situation":"击杀获胜","amount":"$3250","desc":"消灭所有敌方"},
            {"situation":"炸弹爆炸(T)/拆除(CT)","amount":"$3500","desc":"目标获胜额外+250"},
            {"situation":"时间耗尽(CT胜)","amount":"$3250","desc":"CT防守成功"},
            {"situation":"T方安装C4后被拆除","amount":"+$800","desc":"输了但安装C4的额外奖励(每人)"}
        ]
    },
    "lossBonus": {
        "title": "连败奖励递增（Loss Bonus）",
        "desc": "<span class=\"term\" data-tip=\"Loss Bonus = 连续失败奖励机制。每多输一轮，下轮失败奖励+$500，最高$3400。胜利后重置\">Loss Bonus</span> 机制保证落后方不会完全崩盘。",
        "columns": ["连续失败","奖励","说明"],
        "keys": ["streak","amount","desc"],
        "data": [
            {"streak":"第1轮","amount":"$1400","desc":"基础失败奖励"},
            {"streak":"连续2轮","amount":"$1900","desc":"+$500"},
            {"streak":"连续3轮","amount":"$2400","desc":"+$500"},
            {"streak":"连续4轮","amount":"$2900","desc":"+$500"},
            {"streak":"连续5轮+","amount":"$3400","desc":"上限"},
            {"streak":"胜利后再输","amount":"重置$1400","desc":"胜利重置连败计数"}
        ]
    },
    "moneyRules": {
        "title": "金钱规则",
        "columns": ["项目","数值","说明"],
        "keys": ["item","value","desc"],
        "data": [
            {"item":"金钱上限","value":"$16000","desc":"超出不计"},
            {"item":"手枪局初始","value":"$800","desc":"第1轮和第16轮"},
            {"item":"半场切换","value":"重置为$800","desc":"第16轮开始"},
            {"item":"击杀奖励","value":"因武器而异","desc":"步枪$300, SMG$600, 霰弹$900, AWP$100, 刀$1500"}
        ]
    },
    "killReward": {
        "title": "击杀奖励一览",
        "columns": ["武器类型","奖励","说明"],
        "keys": ["weaponType","reward","desc"],
        "data": [
            {"weaponType":"刀 Knife","reward":"$1500","desc":"最高击杀奖励"},
            {"weaponType":"霰弹枪","reward":"$900","desc":"Nova/MAG-7/Sawed-Off（XM1014=$600）"},
            {"weaponType":"SMG（多数）","reward":"$600","desc":"MP9/MAC-10/UMP/MP7/Bizon/MP5"},
            {"weaponType":"手枪","reward":"$300","desc":"所有手枪"},
            {"weaponType":"步枪","reward":"$300","desc":"AK/M4/SG/AUG/Galil/FAMAS"},
            {"weaponType":"P90","reward":"$300","desc":"SMG中唯一$300"},
            {"weaponType":"狙击枪（多数）","reward":"$300","desc":"SSG08/SCAR-20/G3SG1"},
            {"weaponType":"AWP","reward":"$100","desc":"最低击杀奖励"},
            {"weaponType":"手雷","reward":"$300","desc":"HE手雷击杀"},
            {"weaponType":"燃烧弹","reward":"$300","desc":"火焰击杀"},
            {"weaponType":"Zeus x27","reward":"$100","desc":"电击枪，与AWP相同",
              "vpk": { "reward": true }}
        ]
    },
    "equipPrice": {
        "title": "装备价格速查",
        "columns": ["装备","价格","说明"],
        "keys": ["equip","price","desc"],
        "data": [
            {"equip":"护甲 Kevlar","price":"$650","desc":"仅躯干防护"},
            {"equip":"护甲+头盔","price":"$1000","desc":"已有护甲补头盔$350"},
            {"equip":"拆弹器 Defuse Kit","price":"$400","desc":"CT专属，拆弹5s→10s"},
            {"equip":"Zeus x27","price":"$200","desc":"电击枪，一击毙命，仅1发"}
        ]
    },
    "econStrategy": {
        "title": "经济局策略参考",
        "columns": ["策略","团队资金","推荐购买","说明"],
        "keys": ["strategy","budget","recommended","desc"],
        "data": [
            {"strategy":"全 Eco（省钱）","budget":"<$2000/人","recommended":"仅默认手枪","desc":"完全存钱，为下一轮满买做准备"},
            {"strategy":"Force Buy","budget":"$2000~3500/人","recommended":"手枪+护甲 或 Galil/FAMAS+护甲","desc":"赌一把，不留余地"},
            {"strategy":"Half Buy","budget":"$2500~4000/人","recommended":"SMG+护甲头盔","desc":"经济局过渡，确保下轮可满买"},
            {"strategy":"Full Buy","budget":">$4500/人","recommended":"步枪+护甲头盔+投掷物+拆弹器","desc":"标准满买配置"},
            {"strategy":"AWP Full Buy","budget":">$6000/人","recommended":"AWP+手枪+护甲头盔+投掷物","desc":"狙击手配置"}
        ]
    }
};
