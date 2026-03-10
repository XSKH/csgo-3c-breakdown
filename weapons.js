/* 武器数据 - 兼容 file:// 协议 */
var WEAPON_DATA = {
    "sections": ["rifles","rifleDamage","snipers","smgs","pistols","pistolDamage","shotguns","machineGuns","taser"],
    "rifles": {
        "title": "步枪（Rifle）",
        "columns": ["武器", "中文名", "阵营", "价格", "基伤", "射速", "弹匣", "移速", "穿甲率", "射程衰减", "穿透力", "奖励"],
        "keys": ["name", "cn", "side", "price", "damage", "rpm", "magazine", "speed", "armorPen", "rangemod", "penetration", "killReward"],
        "columnTips": {
            "damage": "BaseDamage，武器固有基础伤害值，尚未经过距离衰减/部位倍率/护甲计算",
            "rpm": "Rounds Per Minute，每分钟射速。实际射击间隔 = 60/RPM 秒",
            "armorPen": "Armor Penetration，穿甲率。值越高，护甲减伤效果越弱",
            "rangemod": "Range Modifier，每500u距离伤害乘以此系数。越接近1衰减越少",
            "penetration": "墙壁穿透力，数值越高穿墙伤害保留越多",
            "killReward": "击杀奖励金额，特殊武器（如AWP）奖励较低"
        },
        "data": [
            { "name": "AK-47", "cn": "AK-47", "side": "T", "price": "$2700", "damage": "36", "rpm": "600", "magazine": "30/90", "speed": "215", "armorPen": "77.5%", "rangemod": "0.98", "penetration": "200", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "rpm": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "penetration": true, "killReward": true }
            },
            { "name": "M4A4", "cn": "M4A4", "side": "CT", "price": "$2900", "damage": "33", "rpm": "666", "magazine": "30/90", "speed": "225", "armorPen": "70%", "rangemod": "0.97", "penetration": "200", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "rpm": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "penetration": true, "killReward": true }
            },
            { "name": "M4A1-S", "cn": "M4A1消音型", "side": "CT", "price": "$2900", "damage": "38", "rpm": "600", "magazine": "20/80", "speed": "225", "armorPen": "70%", "rangemod": "0.94", "penetration": "200", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "penetration": true, "killReward": true }
            },
            { "name": "SG 553", "cn": "SG 553", "side": "T", "price": "$3000", "damage": "30", "rpm": "545", "magazine": "30/90", "speed": "210", "armorPen": "100%", "rangemod": "0.98", "penetration": "200", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "penetration": true, "killReward": true }
            },
            { "name": "AUG", "cn": "AUG", "side": "CT", "price": "$3300", "damage": "28", "rpm": "600", "magazine": "30/90", "speed": "220", "armorPen": "90%", "rangemod": "0.98", "penetration": "200", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "penetration": true, "killReward": true }
            },
            { "name": "Galil AR", "cn": "加利尔AR", "side": "T", "price": "$1800", "damage": "30", "rpm": "666", "magazine": "35/90", "speed": "215", "armorPen": "77.5%", "rangemod": "0.98", "penetration": "200", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "penetration": true, "killReward": true }
            },
            { "name": "FAMAS", "cn": "法玛斯", "side": "CT", "price": "$1950", "damage": "30", "rpm": "666", "magazine": "25/90", "speed": "220", "armorPen": "70%", "rangemod": "0.96", "penetration": "200", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "penetration": true, "killReward": true }
            }
        ],
        "note": null
    },
    "rifleDamage": {
        "title": "步枪 — 各距离伤害（有甲目标）",
        "desc": "<span class=\"term\" data-tip=\"500 units ≈ 9.5米，Source引擎距离单位\">500u</span> ≈ 9.5m，1000u ≈ 19m，1500u ≈ 28.6m，2000u ≈ 38m。<br>公式: floor(<span class=\"term\" data-tip=\"BaseDmg = 武器基础伤害\">BaseDmg</span> × <span class=\"term\" data-tip=\"RangeMod = 距离衰减系数，每500u乘一次\">RangeMod</span>^(dist/500) × 部位倍率 × (1-(1-<span class=\"term\" data-tip=\"ArmorPen = 穿甲率\">ArmorPen</span>)×0.5))。下表数值单位为 HP。",
        "columns": ["武器", "500u头", "500u胸", "1000u头", "1000u胸", "1500u头", "2000u头"],
        "keys": ["name", "h500", "c500", "h1000", "c1000", "h1500", "h2000"],
        "columnTips": {
            "h500": "500u（≈9.5m）距离有甲爆头伤害",
            "c500": "500u（≈9.5m）距离有甲胸部伤害",
            "h1000": "1000u（≈19m）距离有甲爆头伤害",
            "c1000": "1000u（≈19m）距离有甲胸部伤害",
            "h1500": "1500u（≈28.6m）距离有甲爆头伤害",
            "h2000": "2000u（≈38m）距离有甲爆头伤害"
        },
        "data": [
            { "name": "AK-47", "h500": "111", "c500": "27", "h1000": "109", "c1000": "27", "h1500": "107", "h2000": "104" },
            { "name": "M4A4", "h500": "92", "c500": "23", "h1000": "89", "c1000": "22", "h1500": "86", "h2000": "84" },
            { "name": "M4A1-S", "h500": "106", "c500": "26", "h1000": "105", "c1000": "26", "h1500": "104", "h2000": "103" },
            { "name": "SG 553", "h500": "120", "c500": "30", "h1000": "118", "c1000": "29", "h1500": "115", "h2000": "113" }
        ],
        "note": "* AK-47任意距离有甲爆头>100（秒杀），M4系无法有甲一击爆头。SG553 100%穿甲率，有甲爆头最高。<br>* M4A1-S爆头倍率3.475×(VPK), rangemod=0.94(VPK)。全部数据已按VPK核实。"
    },
    "snipers": {
        "title": "狙击枪（Sniper）",
        "columns": ["武器", "阵营", "价格", "基伤", "射速", "弹匣", "移速", "穿甲率", "射程衰减", "穿透力", "奖励"],
        "keys": ["name", "side", "price", "damage", "rpm", "magazine", "speed", "armorPen", "rangemod", "penetration", "killReward"],
        "columnTips": {
            "damage": "BaseDamage，武器固有基础伤害值",
            "rpm": "Rounds Per Minute，每分钟射速",
            "armorPen": "Armor Penetration，穿甲率",
            "rangemod": "Range Modifier，每500u距离伤害衰减系数",
            "penetration": "墙壁穿透力，数值越高穿墙伤害保留越多",
            "killReward": "击杀奖励金额"
        },
        "data": [
            { "name": "AWP", "side": "双方", "price": "$4750", "damage": "115", "rpm": "41", "magazine": "5/30", "speed": "200", "armorPen": "97.5%", "rangemod": "0.99", "penetration": "250", "killReward": "$100",
              "vpk": { "price": true, "damage": true, "rpm": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "penetration": true, "killReward": true }
            },
            { "name": "SSG 08", "side": "双方", "price": "$1700", "damage": "88", "rpm": "48", "magazine": "10/90", "speed": "230", "armorPen": "85%", "rangemod": "0.98", "penetration": "250", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "rpm": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "penetration": true, "killReward": true }
            },
            { "name": "SCAR-20", "cn": "SCAR-20", "side": "CT", "price": "$5000", "damage": "80", "rpm": "240", "magazine": "20/90", "speed": "215", "armorPen": "82.5%", "rangemod": "0.98", "penetration": "250", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "rpm": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "penetration": true, "killReward": true }
            },
            { "name": "G3SG1", "side": "T", "price": "$5000", "damage": "80", "rpm": "240", "magazine": "20/90", "speed": "215", "armorPen": "82.5%", "rangemod": "0.98", "penetration": "250", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "rpm": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "penetration": true, "killReward": true }
            }
        ],
        "note": "* AWP弹匣5发(VPK核实)，胸部一击毙命（112有甲），腿部85（仍致残）。AWP击杀奖励仅$100。SSG08(Scout)可蹲跳开镜射击。"
    },
    "smgs": {
        "title": "冲锋枪（SMG）",
        "columns": ["武器", "阵营", "价格", "基伤", "射速", "弹匣", "移速", "穿甲率", "衰减", "奖励"],
        "keys": ["name", "side", "price", "damage", "rpm", "magazine", "speed", "armorPen", "rangemod", "killReward"],
        "columnTips": {
            "damage": "BaseDamage，武器固有基础伤害值",
            "rpm": "Rounds Per Minute，每分钟射速",
            "armorPen": "Armor Penetration，穿甲率",
            "rangemod": "Range Modifier，每500u距离伤害衰减系数。SMG普遍较低，远距离伤害骤降",
            "killReward": "击杀奖励金额。SMG奖励通常$600（P90例外$300）"
        },
        "data": [
            { "name": "MP9", "side": "CT", "price": "$1250", "damage": "26", "rpm": "857", "magazine": "30/120", "speed": "240", "armorPen": "60%", "rangemod": "0.87", "killReward": "$600",
              "vpk": { "price": true, "damage": true, "rpm": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "killReward": true }
            },
            { "name": "MAC-10", "side": "T", "price": "$1050", "damage": "29", "rpm": "800", "magazine": "30/100", "speed": "240", "armorPen": "57.5%", "rangemod": "0.80", "killReward": "$600",
              "vpk": { "price": true, "damage": true, "rpm": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "killReward": true }
            },
            { "name": "UMP-45", "side": "双方", "price": "$1200", "damage": "35", "rpm": "666", "magazine": "25/100", "speed": "230", "armorPen": "65%", "rangemod": "0.75", "killReward": "$600",
              "vpk": { "price": true, "damage": true, "rpm": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "killReward": true }
            },
            { "name": "P90", "side": "双方", "price": "$2350", "damage": "26", "rpm": "857", "magazine": "50/100", "speed": "230", "armorPen": "69%", "rangemod": "0.86", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "rpm": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "killReward": true }
            },
            { "name": "MP7", "side": "双方", "price": "$1400", "damage": "30", "rpm": "750", "magazine": "30/120", "speed": "220", "armorPen": "62.5%", "rangemod": "0.87", "killReward": "$600",
              "vpk": { "price": true, "damage": true, "rpm": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "killReward": true }
            },
            { "name": "PP-Bizon", "side": "双方", "price": "$1300", "damage": "27", "rpm": "750", "magazine": "64/120", "speed": "240", "armorPen": "63%", "rangemod": "0.80", "killReward": "$600",
              "vpk": { "price": true, "damage": true, "rpm": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "killReward": true }
            },
            { "name": "MP5-SD", "cn": "MP5-SD", "side": "双方", "price": "$1400", "damage": "28", "rpm": "750", "magazine": "30/120", "speed": "235", "armorPen": "62.5%", "rangemod": "0.87", "killReward": "$600",
              "vpk": { "price": true, "damage": true, "rpm": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "killReward": true }
            }
        ],
        "note": "* SMG射程衰减低(0.75~0.87)远距离伤害骤降。击杀奖励$600(P90例外$300)。全部数据已按VPK核实。<br>* VPK证实: SMG命中不造成 Tagging 减速(FlinchVelocityModifier=0)。"
    },
    "pistols": {
        "title": "手枪（Pistol）",
        "columns": ["武器", "阵营", "价格", "基伤", "射速", "弹匣", "移速", "穿甲率", "衰减", "奖励"],
        "keys": ["name", "side", "price", "damage", "rpm", "magazine", "speed", "armorPen", "rangemod", "killReward"],
        "columnTips": {
            "damage": "BaseDamage，武器固有基础伤害值",
            "rpm": "Rounds Per Minute，每分钟射速",
            "armorPen": "Armor Penetration，穿甲率。手枪差异极大（Glock 47% vs Deagle 93.2%）",
            "rangemod": "Range Modifier，每500u距离伤害衰减系数",
            "killReward": "击杀奖励金额"
        },
        "data": [
            { "name": "Glock-18", "side": "T默认", "price": "$200", "damage": "30", "rpm": "400", "magazine": "20/120", "speed": "240", "armorPen": "47%", "rangemod": "0.85", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "killReward": true }
            },
            { "name": "USP-S", "side": "CT默认", "price": "$200", "damage": "35", "rpm": "352", "magazine": "12/24", "speed": "240", "armorPen": "50.5%", "rangemod": "0.91", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "killReward": true }
            },
            { "name": "P2000", "side": "CT默认", "price": "$200", "damage": "35", "rpm": "352", "magazine": "13/52", "speed": "240", "armorPen": "50.5%", "rangemod": "0.91", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "killReward": true }
            },
            { "name": "P250", "side": "双方", "price": "$300", "damage": "38", "rpm": "400", "magazine": "13/26", "speed": "240", "armorPen": "64%", "rangemod": "0.90", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "killReward": true }
            },
            { "name": "Five-SeveN", "side": "CT", "price": "$500", "damage": "32", "rpm": "400", "magazine": "20/100", "speed": "240", "armorPen": "91.15%", "rangemod": "0.81", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "killReward": true }
            },
            { "name": "Tec-9", "cn": "Tec-9", "side": "T", "price": "$500", "damage": "33", "rpm": "500", "magazine": "18/90", "speed": "240", "armorPen": "90.6%", "rangemod": "0.79", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "killReward": true }
            },
            { "name": "CZ75-Auto", "side": "双方", "price": "$500", "damage": "31", "rpm": "600", "magazine": "12/12", "speed": "240", "armorPen": "77.65%", "rangemod": "0.85", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "killReward": true }
            },
            { "name": "Desert Eagle", "cn": "沙漠之鹰", "side": "双方", "price": "$700", "damage": "53", "rpm": "267", "magazine": "7/35", "speed": "230", "armorPen": "93.2%", "rangemod": "0.85", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "killReward": true }
            },
            { "name": "Dual Berettas", "cn": "双持贝瑞塔", "side": "双方", "price": "$300", "damage": "38", "rpm": "500", "magazine": "30/120", "speed": "240", "armorPen": "57.5%", "rangemod": "0.79", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "killReward": true }
            },
            { "name": "R8 Revolver", "cn": "R8左轮手枪", "side": "双方", "price": "$600", "damage": "86", "rpm": "120", "magazine": "8/8", "speed": "180", "armorPen": "93.2%", "rangemod": "0.94", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "rangemod": true, "killReward": true }
            }
        ],
        "note": "* Glock穿甲率仅47%（有甲爆头打不死）。Deagle基伤53，爆头倍率3.9×。CZ75弹匣12+12且切出1.83s。R8腰射移速180/开镜220。<br>* 全部数据已按VPK(scriptsweapons.vdata_c/items_game.txt)核实。"
    },
    "pistolDamage": {
        "title": "手枪关键伤害（有甲, 500u近距离）",
        "columns": ["武器", "中文名", "有甲爆头", "无甲爆头", "有甲胸", "一击爆头？"],
        "keys": ["name", "cn", "armoredHead", "unarmoredHead", "armoredChest", "oneShot"],
        "columnTips": {
            "armoredHead": "有护甲目标爆头伤害（500u距离）",
            "unarmoredHead": "无护甲目标爆头伤害（500u距离）",
            "armoredChest": "有护甲目标胸部伤害（500u距离）",
            "oneShot": "是否能一枪爆头击杀有甲目标（>100HP）"
        },
        "data": [
            { "name": "Glock-18", "cn": "格洛克18型", "armoredHead": "~47", "unarmoredHead": "120", "armoredChest": "~12", "oneShot": "❌" },
            { "name": "USP-S", "cn": "USP消音版", "armoredHead": "~57", "unarmoredHead": "140", "armoredChest": "~14", "oneShot": "❌" },
            { "name": "P250", "cn": "P250", "armoredHead": "~112", "unarmoredHead": "136", "armoredChest": "~25", "oneShot": "✅近距离" },
            { "name": "Five-SeveN", "cn": "FN57", "armoredHead": "~115", "unarmoredHead": "128", "armoredChest": "~27", "oneShot": "✅" },
            { "name": "Tec-9", "cn": "Tec-9", "armoredHead": "~118", "unarmoredHead": "132", "armoredChest": "~28", "oneShot": "✅" },
            { "name": "Desert Eagle", "cn": "沙漠之鹰", "armoredHead": "~232", "unarmoredHead": "252", "armoredChest": "~56", "oneShot": "✅任意距离" },
            { "name": "R8 Revolver", "cn": "R8左轮手枪", "armoredHead": "~316", "unarmoredHead": "344", "armoredChest": "~77", "oneShot": "✅蓄力" }
        ],
        "note": null
    },
    "shotguns": {
        "title": "霰弹枪（Shotgun）",
        "columns": ["武器", "中文名", "价格", "单丸伤", "弹丸数", "满伤", "射速", "弹匣", "移速", "穿甲率", "奖励"],
        "keys": ["name", "cn", "price", "pelletDmg", "pellets", "maxDmg", "rpm", "magazine", "speed", "armorPen", "killReward"],
        "columnTips": {
            "pelletDmg": "单颗弹丸的基础伤害",
            "pellets": "一次射击发射的弹丸数量",
            "maxDmg": "全部弹丸命中时的总伤害 = 单丸伤 × 弹丸数",
            "rpm": "Rounds Per Minute，每分钟射速",
            "armorPen": "Armor Penetration，穿甲率",
            "killReward": "击杀奖励$900，全武器类型最高"
        },
        "data": [
            { "name": "Nova", "cn": "新星", "price": "$1050", "pelletDmg": "26", "pellets": "9", "maxDmg": "234", "rpm": "68", "magazine": "8/32", "speed": "220", "armorPen": "50%", "killReward": "$900",
              "vpk": { "price": true, "pelletDmg": true, "pellets": true, "magazine": true, "speed": true, "armorPen": true, "killReward": true }
            },
            { "name": "XM1014", "cn": "XM1014", "price": "$2000", "pelletDmg": "20", "pellets": "6", "maxDmg": "120", "rpm": "171", "magazine": "7/32", "speed": "215", "armorPen": "80%", "killReward": "$600",
              "vpk": { "price": true, "pelletDmg": true, "pellets": true, "magazine": true, "speed": true, "armorPen": true, "killReward": true }
            },
            { "name": "MAG-7", "price": "$1300", "pelletDmg": "30", "pellets": "8", "maxDmg": "240", "rpm": "71", "magazine": "5/32", "speed": "225", "armorPen": "75%", "killReward": "$900",
              "vpk": { "price": true, "pelletDmg": true, "pellets": true, "magazine": true, "speed": true, "armorPen": true, "killReward": true }
            },
            { "name": "Sawed-Off", "price": "$1100", "pelletDmg": "32", "pellets": "8", "maxDmg": "256", "rpm": "71", "magazine": "7/32", "speed": "210", "armorPen": "75%", "killReward": "$900",
              "vpk": { "price": true, "pelletDmg": true, "pellets": true, "magazine": true, "speed": true, "armorPen": true, "killReward": true }
            }
        ],
        "note": "* 击杀奖励: Nova/MAG-7/Sawed-Off=$900, XM1014=$600(VPK)。射程衰减极大(RangeMod~0.45-0.70)，仅近距离有效。<br>* Nova/XM1014有效射程3000u, MAG-7/Sawed-Off仅1400u(VPK)。"
    },
    "machineGuns": {
        "title": "机枪（Machine Gun）",
        "columns": ["武器", "中文名", "价格", "基伤", "射速", "弹匣", "移速", "穿甲率", "奖励"],
        "keys": ["name", "cn", "price", "damage", "rpm", "magazine", "speed", "armorPen", "killReward"],
        "columnTips": {
            "damage": "BaseDamage，武器固有基础伤害值",
            "rpm": "Rounds Per Minute，每分钟射速。Negev达1000 RPM",
            "armorPen": "Armor Penetration，穿甲率",
            "killReward": "击杀奖励金额"
        },
        "data": [
            { "name": "M249", "price": "$5200", "damage": "32", "rpm": "750", "magazine": "100/200", "speed": "195", "armorPen": "80%", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "killReward": true }
            },
            { "name": "Negev", "price": "$1700", "damage": "35", "rpm": "1000", "magazine": "150/300", "speed": "150", "armorPen": "75%", "killReward": "$300",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "armorPen": true, "killReward": true }
            }
        ],
        "note": "* Negev开火初始扩散极大(InaccFire=0.03)，持续射击后收束至0.00337(VPK)，定位区域封锁。全部数据已按VPK核实。"
    },
    "taser": {
        "title": "电击枪（Taser）",
        "columns": ["武器", "价格", "伤害", "弹匣", "移速", "射程", "穿透力", "奖励"],
        "keys": ["name", "price", "damage", "magazine", "speed", "range", "penetration", "killReward"],
        "columnTips": {
            "damage": "单发伤害，一击500足以秒杀（100HP满血）",
            "range": "有效射程，超出距离无法命中",
            "penetration": "穿透力，Zeus无法穿墙",
            "killReward": "击杀奖励金额"
        },
        "data": [
            { "name": "Zeus x27", "price": "$200", "damage": "500", "magazine": "1/0", "speed": "230", "range": "120u (≈2.3m)", "penetration": "0", "killReward": "$100",
              "vpk": { "price": true, "damage": true, "magazine": true, "speed": true, "range": true, "penetration": true, "killReward": true }
            }
        ],
        "note": "* Zeus x27 仅有1发弹药，不可补充。射程仅120 units(≈2.3m)，穿透力为0无法穿墙。装备槽位为 GEAR_SLOT_KNIFE（刀具槽第2位）。伤害500，一击必杀。全部数据已按VPK核实。"
    }
};
