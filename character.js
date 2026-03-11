var CHARACTER_DATA = {
    "sections": ["healthArmor","damageCalc","hitgroups","moveSpeed","speedModifiers","tagging","jumpPhysics"],
    "healthArmor": {
        "title": "生命与护甲系统",
        "columns": ["属性","数值","详细说明"],
        "keys": ["attr","value","desc"],
        "htmlKeys": ["value"],
        "data": [
            {"attr":"最大生命值","value":"<span class=\"term\" data-tip=\"HP = Health Points，生命值。归零即死亡\">100 HP</span>","desc":"所有角色统一，无法增加"},
            {"attr":"护甲上限（Kevlar）","value":"<span class=\"term\" data-tip=\"AP = Armor Points，护甲值。受击时吸收部分伤害并消耗自身\">100 AP</span>","desc":"单独护甲 $650，防护胸/手臂/腹部"},
            {"attr":"头盔+护甲","value":"<span class=\"term\" data-tip=\"头盔不增加AP数值，仍为100。作用是让头部命中也享受护甲减伤\">100 AP + 头盔</span>","desc":"$1000（已有护甲补头盔仅 $350）。护甲值仍为100 AP不变，头盔使头部也受护甲减伤保护"},
            {"attr":"护甲减伤机制","value":"最多减伤50%","desc":"公式: 最终伤害 = 部位伤害 × (1 - <span class=\"term\" data-tip=\"ArmorRatio = 1 - ArmorPen。穿甲率越高 → ArmorRatio越低 → 护甲减伤越少\">ArmorRatio</span> × <span class=\"term\" data-tip=\"0.5 = 引擎硬编码常量（flArmorBonus），来自 CCSPlayer::OnTakeDamage() 源码，非VPK数据，不可修改。作用是限制护甲最多只能减免50%伤害\">0.5</span>)。<br>ArmorRatio = 1 - 穿甲率。<br><b>实际举例</b>: AK穿甲率=77.5% → ArmorRatio=0.225 → 减伤=0.225×0.5=<b>11.25%</b><br>M4穿甲率=70% → ArmorRatio=0.30 → 减伤=<b>15%</b><br>AWP穿甲率=97.5% → ArmorRatio=0.025 → 减伤仅<b>1.25%</b>（几乎无效）"},
            {"attr":"护甲值消耗","value":"<span class=\"term\" data-tip=\"AbsorbedDmg = 被护甲吸收的伤害量 = 部位伤害 - 最终伤害（DmgAfterHitgroup - FinalDmg）\">AbsorbedDmg</span> × 0.5","desc":"每次受击护甲消耗 = 被护甲吸收的伤害 × 0.5。例: 吸收15.56伤害 → 消耗约8点护甲"},
            {"attr":"穿甲率（ArmorPen）","value":"因武器而异","desc":"武器穿透护甲的能力。<span class=\"term\" data-tip=\"ArmorPen 即 Armor Penetration，穿甲率。数值越高 → ArmorRatio越低 → 护甲吸收越少 → 最终伤害越高\">ArmorPen</span> 越高 → 护甲减伤越少。AK=77.5%, M4=70%, AWP=97.5%",
              "vpk": { "value": true }},
            {"attr":"腿部与护甲","value":"护甲不生效","desc":"腿部命中不触发护甲减伤，也不消耗护甲值。但腿部有独立的 <span class=\"term\" data-tip=\"HitGroup Multiplier = 部位伤害倍率，是固定的身体部位系数，与护甲系统完全无关。腿部固定为×0.75\">部位倍率 ×0.75</span>，即伤害 = BaseDmg × 0.75（与护甲系统无关）"}
        ]
    },
    "damageCalc": {
        "title": "伤害计算公式（完整步骤）",
        "desc": "以 AK-47 在 1000u（≈19m）处有甲爆头为例演算：",
        "layout": "pipeline",
        "columns": ["步骤","公式","说明与示例"],
        "keys": ["step","formula","example"],
        "htmlKeys": ["formula"],
        "data": [
            {"step":"1. 基础伤害","formula":"<span class=\"term\" data-tip=\"BaseDamage = 武器的固有基础伤害值，写在武器属性中的固定整数，不受距离/部位/护甲影响\">BaseDamage</span>（无单位，整数）","example":"武器固定值。AK47=36, M4A4=33, AWP=115",
              "vpk": { "example": true }},
            {"step":"2. 距离衰减","formula":"× <span class=\"term\" data-tip=\"RangeMod = 距离衰减系数，每经过500 unit距离伤害乘以此系数一次。大多数武器约为0.98\">RangeMod</span>^(<span class=\"term\" data-tip=\"dist = 子弹飞行距离，单位为unit。1 unit ≈ 1.905cm\">dist</span>/500)","example":"dist 单位为 unit（1u≈1.9cm），每 500u（≈9.5m）衰减一次。<br>AK 1000u: 36 × 0.98^2 = 36 × 0.9604 = <strong>34.57</strong>",
              "vpk": { "example": true }},
            {"step":"3. 部位倍率","formula":"× <span class=\"term\" data-tip=\"HitGroup Multiplier = 击中部位的伤害倍率。头=4.0, 胸/臂=1.0, 腹=1.25, 腿=0.75\">HitGroup Multiplier</span>","example":"头×4.0, 胸/臂×1.0, 腹×1.25, 腿×0.75<br>AK 1000u 爆头: 34.57 × 4.0 = <strong>138.28</strong>",
              "vpk": { "example": true }},
            {"step":"4. 护甲减伤","formula":"× (1 - (1-<span class=\"term\" data-tip=\"ArmorPen = 武器穿甲率，数值越高穿透护甲能力越强。AK=77.5%, M4=70%, AWP=97.5%\">ArmorPen</span>) × 0.5)","example":"<span class=\"term\" data-tip=\"ArmorRatio = 护甲减伤系数 = 1 - ArmorPen。值越低说明武器穿甲能力越强\">ArmorRatio</span> = 1 - ArmorPen。AK ArmorPen=77.5%, ArmorRatio=0.225<br>减伤系数 = 1 - 0.225×0.5 = 0.8875<br>138.28 × 0.8875 = <strong>122.72</strong>",
              "vpk": { "example": true }},
            {"step":"5. 取整","formula":"<span class=\"term\" data-tip=\"floor = 向下取整函数，将小数部分直接去掉。如 122.72 → 122\">floor</span>（向下取整）","example":"122.72 → <strong>122 HP（>100，一击致死）</strong>"}
        ],
        "note": "* 护甲减伤公式中，<span class=\"term\" data-tip=\"ArmorPen = Armor Penetration，武器穿甲率\">ArmorPen</span> 越高（如 AK 77.5%、AWP 97.5%）→ <span class=\"term\" data-tip=\"ArmorRatio = 1 - ArmorPen，护甲减伤系数\">ArmorRatio</span> 越低 → 护甲减伤越少 → 最终伤害越高。"
    },
    "hitgroups": {
        "title": "击中区域伤害倍率",
        "columns": ["部位","倍率","护甲有效","说明"],
        "keys": ["part","mult","armor","desc"],
        "data": [
            {"part":"头部 Head","mult":"×4.0","armor":"需头盔","desc":"AK无甲爆头=144（秒杀），有甲=111（仍秒杀）",
              "vpk": { "mult": true }},
            {"part":"胸部 Chest","mult":"×1.0","armor":"是","desc":"基础伤害区域",
              "vpk": { "mult": true }},
            {"part":"手臂 Arms","mult":"×1.0","armor":"是","desc":"与胸部相同",
              "vpk": { "mult": true }},
            {"part":"腹部 Stomach","mult":"×1.25","armor":"是","desc":"常被忽视的高伤区域",
              "vpk": { "mult": true }},
            {"part":"腿部 Legs","mult":"×0.75","armor":"否","desc":"AWP打腿仍可秒杀",
              "vpk": { "mult": true }}
        ]
    },
    "moveSpeed": {
        "title": "移动速度（units/s）",
        "desc": "单位为 <span class=\"term\" data-tip=\"u/s = units per second，Source引擎的速度单位。1 unit ≈ 1.905cm\">u/s</span>（units per second）。换算: m/s = u/s × 0.01905，km/h = m/s × 3.6。满速 250 u/s ≈ 4.76 m/s ≈ 17.1 km/h。占比以持刀 250 u/s 为 100%。",
        "columns": ["持有武器","中文名","速度(u/s)","持刀%","≈ m/s","速度(u/s)","持刀%","≈ m/s","说明"],
        "keys": ["weapon","cn","speed","ratio","ms","speed2","ratio2","ms2","desc"],
        "columnGroups": [
            {"label":"","span":2},
            {"label":"腰射 / 默认","span":3,"cls":"cg-primary"},
            {"label":"开镜 / 模式二","span":3,"cls":"cg-secondary"},
            {"label":"","span":1}
        ],
        "categoryColors": {
            "装备":"#9e9e9e","手枪":"#66bb6a","SMG":"#42a5f5","步枪":"#ef5350","霰弹枪":"#ffa726","狙击枪":"#ab47bc","机枪":"#78909c"
        },
        "data": [
            {"weapon":"持刀 Knife","cn":"持刀","speed":"250","ratio":"100%","ms":"4.76","speed2":"—","ratio2":"—","ms2":"—","desc":"最高速度","cat":"装备","vpk":{"speed":true}},
            {"weapon":"C4 炸弹","cn":"C4 炸弹","speed":"250","ratio":"100%","ms":"4.76","speed2":"—","ratio2":"—","ms2":"—","desc":"与持刀相同","cat":"装备","vpk":{"speed":true}},
            {"weapon":"手雷（全部）","cn":"手雷（全部）","speed":"245","ratio":"98%","ms":"4.67","speed2":"—","ratio2":"—","ms2":"—","desc":"闪光/烟雾/燃烧/高爆/诱饵","cat":"装备","vpk":{"speed":true}},
            {"weapon":"Zeus x27","cn":"宙斯 x27","speed":"230","ratio":"92%","ms":"4.38","speed2":"—","ratio2":"—","ms2":"—","desc":"电击枪，一击500伤害，仅1发","cat":"装备","vpk":{"speed":true}},

            {"weapon":"Glock-18","cn":"格洛克18型","speed":"240","ratio":"96%","ms":"4.57","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"手枪","vpk":{"speed":true}},
            {"weapon":"P2000","cn":"P2000","speed":"240","ratio":"96%","ms":"4.57","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"手枪","vpk":{"speed":true}},
            {"weapon":"USP-S","cn":"USP消音版","speed":"240","ratio":"96%","ms":"4.57","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"手枪","vpk":{"speed":true}},
            {"weapon":"P250","cn":"P250","speed":"240","ratio":"96%","ms":"4.57","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"手枪","vpk":{"speed":true}},
            {"weapon":"Five-SeveN","cn":"FN57","speed":"240","ratio":"96%","ms":"4.57","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"手枪","vpk":{"speed":true}},
            {"weapon":"Tec-9","cn":"Tec-9","speed":"240","ratio":"96%","ms":"4.57","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"手枪","vpk":{"speed":true}},
            {"weapon":"CZ75-Auto","cn":"CZ75自动手枪","speed":"240","ratio":"96%","ms":"4.57","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"手枪","vpk":{"speed":true}},
            {"weapon":"Dual Berettas","cn":"双持贝瑞塔","speed":"240","ratio":"96%","ms":"4.57","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"手枪","vpk":{"speed":true}},
            {"weapon":"Desert Eagle","cn":"沙漠之鹰","speed":"230","ratio":"92%","ms":"4.38","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"手枪","vpk":{"speed":true}},
            {"weapon":"R8 Revolver","cn":"R8左轮手枪","speed":"220","ratio":"88%","ms":"4.19","speed2":"180","ratio2":"72%","ms2":"3.43","desc":"腰射=右键扇射; 模式二=左键蓄力","cat":"手枪","vpk":{"speed":true,"speed2":true}},

            {"weapon":"MP9","cn":"MP9","speed":"240","ratio":"96%","ms":"4.57","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"SMG","vpk":{"speed":true}},
            {"weapon":"MAC-10","cn":"MAC-10","speed":"240","ratio":"96%","ms":"4.57","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"SMG","vpk":{"speed":true}},
            {"weapon":"PP-Bizon","cn":"PP-野牛","speed":"240","ratio":"96%","ms":"4.57","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"SMG","vpk":{"speed":true}},
            {"weapon":"MP5-SD","cn":"MP5-SD","speed":"235","ratio":"94%","ms":"4.48","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"SMG","vpk":{"speed":true}},
            {"weapon":"UMP-45","cn":"UMP-45","speed":"230","ratio":"92%","ms":"4.38","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"SMG","vpk":{"speed":true}},
            {"weapon":"P90","cn":"P90","speed":"230","ratio":"92%","ms":"4.38","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"SMG","vpk":{"speed":true}},
            {"weapon":"MP7","cn":"MP7","speed":"220","ratio":"88%","ms":"4.19","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"SMG","vpk":{"speed":true}},

            {"weapon":"M4A4","cn":"M4A4","speed":"225","ratio":"90%","ms":"4.29","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"步枪","vpk":{"speed":true}},
            {"weapon":"M4A1-S","cn":"M4A1消音型","speed":"225","ratio":"90%","ms":"4.29","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"步枪","vpk":{"speed":true}},
            {"weapon":"FAMAS","cn":"法玛斯","speed":"220","ratio":"88%","ms":"4.19","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"步枪","vpk":{"speed":true}},
            {"weapon":"AUG","cn":"AUG","speed":"220","ratio":"88%","ms":"4.19","speed2":"150","ratio2":"60%","ms2":"2.86","desc":"开镜 ×0.682","cat":"步枪","vpk":{"speed":true,"speed2":true}},
            {"weapon":"AK-47","cn":"AK-47","speed":"215","ratio":"86%","ms":"4.10","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"步枪","vpk":{"speed":true}},
            {"weapon":"Galil AR","cn":"加利尔AR","speed":"215","ratio":"86%","ms":"4.10","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"步枪","vpk":{"speed":true}},
            {"weapon":"SG 553","cn":"SG 553","speed":"210","ratio":"84%","ms":"4.00","speed2":"150","ratio2":"60%","ms2":"2.86","desc":"开镜 ×0.714","cat":"步枪","vpk":{"speed":true,"speed2":true}},

            {"weapon":"MAG-7","cn":"MAG-7","speed":"225","ratio":"90%","ms":"4.29","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"霰弹枪","vpk":{"speed":true}},
            {"weapon":"Nova","cn":"新星","speed":"220","ratio":"88%","ms":"4.19","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"霰弹枪","vpk":{"speed":true}},
            {"weapon":"XM1014","cn":"XM1014","speed":"215","ratio":"86%","ms":"4.10","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"霰弹枪","vpk":{"speed":true}},
            {"weapon":"Sawed-Off","cn":"截短霰弹枪","speed":"210","ratio":"84%","ms":"4.00","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"霰弹枪","vpk":{"speed":true}},

            {"weapon":"SSG 08","cn":"SSG 08","speed":"230","ratio":"92%","ms":"4.38","speed2":"230","ratio2":"92%","ms2":"4.38","desc":"开镜不降速 ×1.00","cat":"狙击枪","vpk":{"speed":true,"speed2":true}},
            {"weapon":"SCAR-20","cn":"SCAR-20","speed":"215","ratio":"86%","ms":"4.10","speed2":"120","ratio2":"48%","ms2":"2.29","desc":"自动狙，开镜 ×0.558","cat":"狙击枪","vpk":{"speed":true,"speed2":true}},
            {"weapon":"G3SG1","cn":"G3SG1","speed":"215","ratio":"86%","ms":"4.10","speed2":"120","ratio2":"48%","ms2":"2.29","desc":"自动狙，开镜 ×0.558","cat":"狙击枪","vpk":{"speed":true,"speed2":true}},
            {"weapon":"AWP","cn":"AWP","speed":"200","ratio":"80%","ms":"3.81","speed2":"100","ratio2":"40%","ms2":"1.91","desc":"开镜 ×0.50","cat":"狙击枪","vpk":{"speed":true,"speed2":true}},

            {"weapon":"M249","cn":"M249","speed":"195","ratio":"78%","ms":"3.72","speed2":"—","ratio2":"—","ms2":"—","desc":"—","cat":"机枪","vpk":{"speed":true}},
            {"weapon":"Negev","cn":"内格夫","speed":"150","ratio":"60%","ms":"2.86","speed2":"—","ratio2":"—","ms2":"—","desc":"最慢武器","cat":"机枪","vpk":{"speed":true}}
        ]
    },
    "speedModifiers": {
        "title": "速度修正",
        "desc": "实际速度 = 当前武器的 <span class=\"term\" data-tip=\"MaxSpeed = 每把武器在VPK中定义的固有最大移速，非统一基础值。持刀250、AK215、AWP200等各不相同\">MaxSpeed</span> × 状态系数。注: 每把武器有各自的 MaxSpeed（见上表），此处以不同武器举例。",
        "columns": ["状态","系数","计算示例"],
        "keys": ["state","mult","example"],
        "data": [
            {"state":"蹲下 Crouch","mult":"×0.34","example":"持刀: 250×0.34 = 85 u/s; AK: 215×0.34 = 73 u/s",
              "game": { "mult": true }},
            {"state":"静步 Walk(Shift)","mult":"×0.52","example":"持刀: 250×0.52 = 130 u/s; AK: 215×0.52 = 112 u/s。低于此速度不出脚步声",
              "game": { "mult": true }},
            {"state":"蹲下+静步","mult":"×0.34（不叠乘）","example":"持刀: 250×0.34 = 85 u/s。蹲下优先，静步不额外降速",
              "game": { "mult": true }},
            {"state":"后退","mult":"×0.90","example":"持刀: 250×0.90 = 225 u/s; AK: 215×0.90 = 193.5 u/s",
              "game": { "mult": true }},
            {"state":"开镜 AWP","mult":"×0.50","example":"200×0.50 = 100 u/s ≈ 1.91 m/s",
              "vpk": { "mult": true }},
            {"state":"开镜 SSG 08","mult":"×1.00","example":"230×1.00 = 230 u/s（开镜不降速）",
              "vpk": { "mult": true }},
            {"state":"开镜 SCAR-20 | G3SG1","mult":"×0.558","example":"215×0.558 ≈ 120 u/s",
              "vpk": { "mult": true }},
            {"state":"开镜 AUG","mult":"×0.682","example":"220×0.682 ≈ 150 u/s",
              "vpk": { "mult": true }},
            {"state":"开镜 SG 553","mult":"×0.714","example":"210×0.714 ≈ 150 u/s",
              "vpk": { "mult": true }}
        ],
        "note": "* 蹲下(×0.34)、静步(×0.52)、后退(×0.90) 三个系数为引擎硬编码常量，已通过游戏内 cl_showpos 实测验证。蹲下+静步实测速度=85 u/s，与纯蹲下相同，两者不叠乘。开镜系数来自各武器 VPK 中的 m_flMaxSpeed2 / m_flMaxSpeed 比值。"
    },
    "tagging": {
        "title": "Tagging 被击中减速",
        "desc": "被子弹命中会产生减速（<span class=\"term\" data-tip=\"Tagging = 中弹减速效果。由 FlinchVelocityModifier 控制，值为速度保留比例，越小减速越强（0.00=无减速效果，1.00=完全静止）\">Tagging</span>），通过武器的 FlinchVelocityModifier 参数控制。<br>每把武器有两个 Flinch 参数：<b>Large</b>（大幅晃动减速，减速更强）和 <b>Small</b>（小幅晃动减速，减速较弱）。<br>数值含义：<b>速度保留比例</b>（被击中后速度 = 当前速度 × 系数），值越小 → 速度损失越大 → 减速效果越强。0.00 表示不造成减速。<br><br><b>武器口径分类（VPK）：</b><br>• <b>大口径</b>：步枪（AK/M4/Galil/FAMAS/AUG/SG553）、狙击枪（AWP/SSG08/SCAR-20/G3SG1）、机枪（M249/Negev）、霰弹枪（全部）<br>• <b>小口径</b>：SMG（全部）、手枪（全部）<br>• 大口径武器的 Tagging 效果整体更强（Large值更低），SMG 不造成任何减速。",
        "columns": ["攻击武器类型","口径","FlinchLarge","FlinchSmall","说明"],
        "keys": ["weaponType","caliber","flinchLarge","flinchSmall","desc"],
        "columnTips": {
            "flinchLarge": "m_flFlinchVelocityModifierLarge — 大幅晃动减速系数。被击中后速度 = 当前速度 × 此值，值越小减速越强。对应较强的 flinch 反应",
            "flinchSmall": "m_flFlinchVelocityModifierSmall — 小幅晃动减速系数。被击中后速度 = 当前速度 × 此值，值越小减速越强。对应较弱的 flinch 反应"
        },
        "data": [
            {"weaponType":"AK-47 / M4A4 / Galil AR / FAMAS / AUG / SG 553","caliber":"大口径","flinchLarge":"0.40","flinchSmall":"0.55","desc":"多数步枪统一数值",
              "vpk": { "flinchLarge": true, "flinchSmall": true }},
            {"weaponType":"M4A1-S","caliber":"大口径","flinchLarge":"0.40","flinchSmall":"0.40","desc":"步枪中唯一 Small=0.40 的例外",
              "vpk": { "flinchLarge": true, "flinchSmall": true }},
            {"weaponType":"AWP / SSG 08 / SCAR-20","caliber":"大口径","flinchLarge":"0.35","flinchSmall":"0.40","desc":"Tagging 最强，减速最多",
              "vpk": { "flinchLarge": true, "flinchSmall": true }},
            {"weaponType":"G3SG1","caliber":"大口径","flinchLarge":"0.50","flinchSmall":"0.65","desc":"虽为狙击枪，但 Flinch 值与普通手枪相同",
              "vpk": { "flinchLarge": true, "flinchSmall": true }},
            {"weaponType":"Nova / XM1014 / MAG-7 / Sawed-Off","caliber":"大口径","flinchLarge":"0.40","flinchSmall":"0.45","desc":"全部霰弹枪数值统一",
              "vpk": { "flinchLarge": true, "flinchSmall": true }},
            {"weaponType":"M249 / Negev","caliber":"大口径","flinchLarge":"0.40","flinchSmall":"0.55","desc":"与多数步枪相同",
              "vpk": { "flinchLarge": true, "flinchSmall": true }},
            {"weaponType":"MAC-10 / MP9 / MP5-SD / MP7 / P90 / PP-Bizon / UMP-45","caliber":"小口径","flinchLarge":"0.00","flinchSmall":"0.00","desc":"全部 SMG 均不造成 Tagging 减速",
              "vpk": { "flinchLarge": true, "flinchSmall": true }},
            {"weaponType":"Glock / P2000 / USP-S / P250 / Five-SeveN / Tec-9 / CZ75 / Dual Berettas","caliber":"小口径","flinchLarge":"0.50","flinchSmall":"0.65","desc":"多数手枪统一数值",
              "vpk": { "flinchLarge": true, "flinchSmall": true }},
            {"weaponType":"Desert Eagle","caliber":"小口径","flinchLarge":"0.40","flinchSmall":"0.55","desc":"手枪中减速最强，与步枪相同",
              "vpk": { "flinchLarge": true, "flinchSmall": true }},
            {"weaponType":"R8 Revolver","caliber":"小口径","flinchLarge":"0.40","flinchSmall":"0.40","desc":"手枪中 Small 值最低，与 M4A1-S 相同",
              "vpk": { "flinchLarge": true, "flinchSmall": true }}
        ]
    },
    "jumpPhysics": {
        "title": "跳跃与碰撞体",
        "desc": "长度单位为 unit（1u ≈ 1.905cm），速度单位为 u/s，加速度为 u/s²。",
        "columns": ["属性","数值","换算/说明"],
        "keys": ["attr","value","desc"],
        "htmlKeys": ["attr","value"],
        "data": [
            {"attr":"<span class=\"term\" data-tip=\"sv_jump_impulse = 起跳时赋予玩家的初始垂直速度（u/s），决定跳跃高度。控制台命令: sv_jump_impulse\">跳跃高度</span>","value":"55.83 u","desc":"≈ 1.06m。初始垂直速度 301.993378 u/s。每帧垂直速度受 sv_gravity 衰减，到达顶点后下落",
              "console": { "value": true }, "game": { "value": true }},
            {"attr":"<span class=\"term\" data-tip=\"蹲跳并非跳得更高，而是空中蹲下后碰撞体从72u缩至54u（收腿18u），能越过更高障碍物。数据来源: 引擎源码 VEC_HULL / VEC_DUCK_HULL 常量差值 + 跳跃高度\">蹲跳高度</span>","value":"57.00 u","desc":"≈ 1.09m。跳跃+空中蹲下收腿，碰撞体缩短使可越过更高台面（非实际跳更高）。验证: cl_showpos 1 观察蹲跳能上的箱子高度",
              "game": { "value": true }},
            {"attr":"<span class=\"term\" data-tip=\"引擎源码硬编码: VEC_HULL_MAX(16, 16, 72)，宽高均为固定值，不在VPK或ConVar中。验证: cl_showpos 1 + r_drawclipbrushes 2 可视化碰撞盒\">站立碰撞体</span>","value":"72u高 × 32u宽","desc":"高≈1.37m，宽≈0.61m。<span class=\"term\" data-tip=\"眼位（Eye Position）= 摄像机高度，决定玩家视角的垂直位置\">眼位</span>高度 64u≈1.22m。来源: Source 引擎源码 VEC_HULL_MAX 常量"},
            {"attr":"<span class=\"term\" data-tip=\"引擎源码硬编码: VEC_DUCK_HULL_MAX(16, 16, 54)，蹲下后碰撞体缩短18u。验证: 蹲下状态 cl_showpos 1 观察坐标\">蹲下碰撞体</span>","value":"54u高","desc":"≈1.03m。眼位 46u≈0.88m。来源: Source 引擎源码 VEC_DUCK_HULL_MAX 常量"},
            {"attr":"<span class=\"term\" data-tip=\"sv_gravity = Source 引擎的重力加速度参数（u/s²），影响跳跃和下落速度。控制台命令: sv_gravity\">重力</span>","value":"800 u/s²","desc":"≈ 15.24 m/s²（约1.55倍地球重力）。引擎每帧对玩家施加向下加速度，决定跳跃弧线高低和坠落速度",
              "console": { "value": true }},
            {"attr":"<span class=\"term\" data-tip=\"sv_airaccelerate = 空中加速率，控制玩家在空中改变方向的能力。控制台命令: sv_airaccelerate。值越大 → 空中转向越灵活\">空气加速</span>","value":"12","desc":"引擎每帧在空中按A/D+鼠标转向时增加水平速度的倍率。是<span class=\"term\" data-tip=\"Strafe Jump = 空中平移跳跃技巧，空中按A/D+转鼠标，利用空中加速获得超过武器MaxSpeed的速度\">Strafe</span>/<span class=\"term\" data-tip=\"Bunny Hop = 连续跳跃技巧，着地瞬间立刻跳，保持空中获得的额外速度不被地面摩擦消耗\">Bhop</span>技巧的物理基础（若为0则空中无法转向）",
              "console": { "value": true }},
            {"attr":"<span class=\"term\" data-tip=\"sv_accelerate = 地面加速率，控制玩家从静止到达武器最大速度的快慢。控制台命令: sv_accelerate\">地面加速</span>","value":"5.5","desc":"引擎每帧在地面移动时增加水平速度的倍率。值越大从静止到满速越快（起步手感更灵敏）",
              "console": { "value": true }},
            {"attr":"<span class=\"term\" data-tip=\"sv_friction = 地面摩擦系数，数值越高玩家停下越快。控制台命令: sv_friction。影响反向急停的核心参数\">摩擦力</span>","value":"5.2","desc":"松开移动键后引擎每帧对玩家施加减速。值越高急停越快，是反向急停操作手感的关键参数",
              "console": { "value": true }},
            {"attr":"<span class=\"term\" data-tip=\"数据来源: 引擎源码 sv_falldamage_scale 相关逻辑 + 社区测试。验证: sv_cheats 1 → cl_showpos 1，从不同高度跳下观察着地速度和扣血量\">摔伤阈值速度</span>","value":">580 u/s","desc":"≈ 11 m/s。高处坠落着地时垂直速度超过此阈值开始扣血，速度越快扣血越多。来源: 引擎源码 + 社区测试验证"},
            {"attr":"<span class=\"term\" data-tip=\"数据来源: 引擎源码 + 社区测试。验证: sv_cheats 1 → cl_showpos 1，约6.3m高度自由落体着地即死亡\">致死坠落速度</span>","value":">1024 u/s","desc":"≈ 19.5 m/s。约 6.3m 高度自由落体着地即死。来源: 引擎源码 + 社区测试验证"},
            {"attr":"<span class=\"term\" data-tip=\"跳跃落地惩罚机制: 着地瞬间武器准心大幅扩散（弹道精度急剧下降），落地后立刻开枪子弹会严重偏离。是游戏对跳射行为的惩罚\">落地精度惩罚</span>","value":"~0.4s","desc":"跳跃着地瞬间武器精度急剧下降，准心大幅扩散，持续约0.4秒后恢复。意味着落地后立刻开枪子弹会严重偏离"},
            {"attr":"<span class=\"term\" data-tip=\"站↔蹲切换有过渡动画，碰撞体高度在72u↔54u之间渐变，非瞬间完成。影响蹲下peek（蹲下探头）的时机判断\">蹲下过渡</span>","value":"~0.4s","desc":"站立↔蹲下切换的过渡动画时长，期间碰撞体在72u↔54u之间渐变。影响蹲下peek探头的时机判断"}
        ]
    }
};
