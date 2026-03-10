var CONTROL_DATA = {
    "sections": ["accuracy","recoil","recoveryTime","operationTime","counterStrafe","wallbang"],
    "accuracy": {
        "title": "射击精度系统（Inaccuracy）",
        "desc": "每把武器在不同状态下有固定的 <span class=\"term\" data-tip=\"Inaccuracy = 弹道散布值，引擎内部角度单位。值越大弹道散布锥角越大越不准\">Inaccuracy</span> 值（引擎内部角度单位，非°度），值越大弹道散布锥角越大越不准。实际弹着点 = 固定 <span class=\"term\" data-tip=\"Spray Pattern = 后坐力弹道图案，每把武器固定的子弹轨迹模式\">Spray Pattern</span> + 随机 Inaccuracy 散布。数值仅用于相对比较，不直接对应角度。",
        "columns": ["武器","站立静止","蹲下静止","移动中","空中","开镜"],
        "keys": ["weapon","stand","crouch","move","air","scoped"],
        "data": [
            {"weapon":"AK-47","stand":"7.01","crouch":"5.40","move":"175.06","air":"187.63","scoped":"—"},
            {"weapon":"M4A4","stand":"5.23","crouch":"4.19","move":"137.41","air":"157.35","scoped":"—"},
            {"weapon":"M4A1-S","stand":"4.61","crouch":"3.56","move":"121.47","air":"143.51","scoped":"—"},
            {"weapon":"AWP（腰射）","stand":"41.15","crouch":"27.62","move":"171.00","air":"609.38","scoped":"—"},
            {"weapon":"AWP（开镜）","stand":"—","crouch":"—","move":"—","air":"—","scoped":"3.17"},
            {"weapon":"SSG 08（腰射）","stand":"32.23","crouch":"21.56","move":"160.00","air":"450.00","scoped":"—"},
            {"weapon":"SSG 08（开镜）","stand":"—","crouch":"—","move":"—","air":"—","scoped":"4.50"},
            {"weapon":"SG 553（开镜）","stand":"—","crouch":"—","move":"—","air":"—","scoped":"3.04"},
            {"weapon":"AUG（开镜）","stand":"—","crouch":"—","move":"—","air":"—","scoped":"2.20"},
            {"weapon":"Glock-18","stand":"9.00","crouch":"7.20","move":"18.00","air":"46.72","scoped":"—"},
            {"weapon":"USP-S","stand":"7.49","crouch":"5.93","move":"20.97","air":"55.88","scoped":"—"},
            {"weapon":"Desert Eagle","stand":"8.43","crouch":"6.87","move":"35.34","air":"120.96","scoped":"—"},
            {"weapon":"P90","stand":"11.00","crouch":"7.98","move":"56.41","air":"82.49","scoped":"—"}
        ],
        "note": "* 蹲下精度比站立提升约20~25%。速度低于约34%最大速度时恢复站立精度。"
    },
    "recoil": {
        "title": "后坐力系统（Recoil）详解",
        "columns": ["概念","数值/机制","说明"],
        "keys": ["concept","value","desc"],
        "data": [
            {"concept":"Spray Pattern","value":"固定弹道图案","desc":"每把武器有固定后坐力轨迹（25~30发）"},
            {"concept":"Recoil Magnitude","value":"AK≈30°, M4≈23°, AWP≈11°","desc":"完整弹匣总后坐力幅度"},
            {"concept":"View Punch","value":"= Recoil × ~0.45","desc":"屏幕视觉晃动"},
            {"concept":"AK前7发","value":"纯上抬约11.5°","desc":"压枪持续向下拉"},
            {"concept":"AK第8-20发","value":"左右Z字形偏移","desc":"最难控制阶段"},
            {"concept":"M4A4特性","value":"偏移≈AK的75%","desc":"更易控制"},
            {"concept":"M4A1-S特性","value":"偏移≈AK的60%","desc":"最易控弹步枪之一"}
        ]
    },
    "recoveryTime": {
        "title": "精度与后坐力恢复时间",
        "columns": ["武器","Cycle Time","精度恢复","后坐力完全恢复","推荐点射"],
        "keys": ["weapon","cycleTime","accRecovery","recoilRecovery","tapTip"],
        "columnTips": {
            "cycleTime": "Cycle Time = 两发子弹之间的最小间隔时间，决定实际射速",
            "accRecovery": "停止射击后，精度从最大散布恢复到站立静止精度所需的时间",
            "recoilRecovery": "停止射击后，后坐力偏移完全归零所需的时间"
        },
        "data": [
            {"weapon":"AK-47","cycleTime":"0.10s (600RPM)","accRecovery":"0.368s(站) / 0.305s(蹲)","recoilRecovery":"0.506s(站) / 0.420s(蹲)","tapTip":"2-3发,间隔0.4s+"},
            {"weapon":"M4A4","cycleTime":"0.09s (666RPM)","accRecovery":"0.339s(站) / 0.242s(蹲)","recoilRecovery":"0.466s(站) / 0.333s(蹲)","tapTip":"3-5发,间隔0.35s+"},
            {"weapon":"M4A1-S","cycleTime":"0.10s (600RPM)","accRecovery":"0.339s(站) / 0.242s(蹲)","recoilRecovery":"0.466s(站) / 0.333s(蹲)","tapTip":"3-5发连射精度优秀"},
            {"weapon":"AWP","cycleTime":"1.455s (拉栓)","accRecovery":"0.345s(站) / 0.247s(蹲)","recoilRecovery":"0.345s(站) / 0.247s(蹲)","tapTip":"每发拉栓"},
            {"weapon":"Desert Eagle","cycleTime":"0.225s (267RPM)","accRecovery":"0.811s(站) / 0.450s(蹲)","recoilRecovery":"0.811s(站) / 0.450s(蹲)","tapTip":"必须等恢复再射"},
            {"weapon":"Glock-18","cycleTime":"0.15s (400RPM)","accRecovery":"0.20s(站) / 0.20s(蹲)","recoilRecovery":"0.33s(站) / 0.33s(蹲)","tapTip":"连点即可"},
            {"weapon":"USP-S","cycleTime":"0.17s (352RPM)","accRecovery":"0.350s(站) / 0.291s(蹲)","recoilRecovery":"0.350s(站) / 0.291s(蹲)","tapTip":"精准点射"}
        ]
    },
    "operationTime": {
        "title": "武器操作时间（秒）",
        "columns": ["武器","换弹","切出(Deploy)","特殊"],
        "keys": ["weapon","reload","deploy","special"],
        "columnTips": {
            "reload": "Reload Time，从按下换弹键到弹匣装满的完整时间",
            "deploy": "Deploy Time，从切换武器到可以射击的延迟时间"
        },
        "data": [
            {"weapon":"AK-47","reload":"2.47s","deploy":"1.00s","special":"—"},
            {"weapon":"M4A4","reload":"3.07s","deploy":"1.13s","special":"—"},
            {"weapon":"M4A1-S","reload":"3.07s","deploy":"1.13s","special":"—"},
            {"weapon":"AWP","reload":"3.67s","deploy":"1.27s","special":"拉栓1.455s; 开镜0.30s"},
            {"weapon":"SSG 08","reload":"3.70s","deploy":"1.00s","special":"拉栓1.25s; 开镜0.20s"},
            {"weapon":"SG 553","reload":"2.80s","deploy":"1.00s","special":"开/关镜0.20s"},
            {"weapon":"AUG","reload":"3.77s","deploy":"1.17s","special":"开/关镜0.20s"},
            {"weapon":"Glock-18","reload":"2.17s","deploy":"1.00s","special":"可切Burst(3连发)"},
            {"weapon":"USP-S","reload":"2.17s","deploy":"1.00s","special":"消音器"},
            {"weapon":"Desert Eagle","reload":"2.17s","deploy":"1.00s","special":"—"},
            {"weapon":"CZ75-Auto","reload":"2.70s","deploy":"1.83s","special":"切出最慢手枪"},
            {"weapon":"R8 Revolver","reload":"2.30s","deploy":"1.17s","special":"左键蓄力0.4s; 右键扇射"},
            {"weapon":"刀 Knife","reload":"—","deploy":"1.00s","special":"左键25dmg, 右键55/180dmg"}
        ]
    },
    "counterStrafe": {
        "title": "急停（Counter-Strafe）详解",
        "columns": ["要素","数值","说明"],
        "keys": ["factor","value","desc"],
        "data": [
            {"factor":"精度阈值速度","value":"~34% 最大速度","desc":"AK: 215×0.34≈73 u/s"},
            {"factor":"反向急停耗时","value":"~0.06~0.10s","desc":"约2-3帧（64tick）"},
            {"factor":"自然减速耗时","value":"~0.25~0.40s","desc":"松键靠摩擦力，远慢于急停"},
            {"factor":"蹲下急停","value":"~0.1s","desc":"蹲下瞬间速度降至34%"},
            {"factor":"64tick vs 128tick","value":"15.6ms / 7.8ms","desc":"128tick急停响应更精确"}
        ]
    },
    "wallbang": {
        "title": "壁射穿透（Wall Bang）",
        "columns": ["武器","穿透力","说明"],
        "keys": ["weapon","penetration","desc"],
        "columnTips": {
            "penetration": "穿透力数值，决定子弹能穿过多厚的墙壁。数值越高穿墙能力越强"
        },
        "data": [
            {"weapon":"AWP","penetration":"250","desc":"可穿大部分薄墙，穿墙仍致命"},
            {"weapon":"AK-47/M4","penetration":"200","desc":"可穿木门/薄墙"},
            {"weapon":"P90","penetration":"100","desc":"所有SMG穿透力均为100"},
            {"weapon":"Glock-18","penetration":"100","desc":"多数手枪穿透力100"},
            {"weapon":"Desert Eagle","penetration":"200","desc":"手枪中穿透最强（同步枪级别）"},
            {"weapon":"Zeus x27","penetration":"0","desc":"电击枪无法穿墙，射程仅120u(≈2.3m)",
              "vpk": { "penetration": true }}
        ],
        "note": "* 穿透后伤害约为原伤害的10%~60%，取决于材质厚度。材质衰减: 木头~30%, 薄墙~50%, 铁板~70%。"
    }
};
