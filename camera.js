var CAMERA_DATA = {
    "sections": ["fov","sensitivity","sensFormula","viewShake","visualEffects"],
    "fov": {
        "title": "视野角度（FOV）详细",
        "columns": ["武器/状态","FOV","放大倍率","开镜移速","说明"],
        "keys": ["weapon","fov","zoom","moveSpeed","desc"],
        "columnTips": {
            "fov": "Field of View，视野角度。数值越小视野越窄但看得越远",
            "zoom": "放大倍率 = 90° / 当前FOV",
            "moveSpeed": "开镜状态下的移速系数，乘以武器基础移速"
        },
        "data": [
            {"weapon":"默认","fov":"90°","zoom":"1.0x","moveSpeed":"—","desc":"固定值不可更改"},
            {"weapon":"AWP 一倍镜","fov":"40°","zoom":"2.25x","moveSpeed":"×0.50","desc":"开镜移速100u/s"},
            {"weapon":"AWP 二倍镜","fov":"10°","zoom":"9.0x","moveSpeed":"×0.50","desc":"开镜移速100u/s"},
            {"weapon":"SSG 08 一倍镜","fov":"40°","zoom":"2.25x","moveSpeed":"×1.00","desc":"开镜不降速(230u/s)"},
            {"weapon":"SSG 08 二倍镜","fov":"15°","zoom":"6.0x","moveSpeed":"×1.00","desc":"开镜不降速(230u/s)"},
            {"weapon":"SCAR-20 一倍镜","fov":"40°","zoom":"2.25x","moveSpeed":"×0.558","desc":"开镜移速120u/s"},
            {"weapon":"SCAR-20 二倍镜","fov":"15°","zoom":"6.0x","moveSpeed":"×0.558","desc":"开镜移速120u/s"},
            {"weapon":"G3SG1 同上","fov":"40°/15°","zoom":"2.25x/6.0x","moveSpeed":"×0.558","desc":"开镜移速120u/s"},
            {"weapon":"SG 553","fov":"45°","zoom":"2.0x","moveSpeed":"×0.714","desc":"T侧步枪镜(150/210)"},
            {"weapon":"AUG","fov":"45°","zoom":"2.0x","moveSpeed":"×0.682","desc":"CT侧步枪镜(150/220)"}
        ]
    },
    "sensitivity": {
        "title": "灵敏度系统",
        "columns": ["参数","默认值","说明"],
        "keys": ["param","defaultVal","desc"],
        "data": [
            {"param":"sensitivity","defaultVal":"2.5","desc":"基础灵敏度"},
            {"param":"zoom_sensitivity_ratio_mouse","defaultVal":"1.0","desc":"开镜灵敏度倍率"},
            {"param":"m_rawinput","defaultVal":"1（推荐）","desc":"跳过系统鼠标加速"},
            {"param":"m_yaw / m_pitch","defaultVal":"0.022","desc":"每count转动角度"}
        ]
    },
    "sensFormula": {
        "title": "灵敏度换算公式",
        "columns": ["公式","表达式","说明"],
        "keys": ["name","formula","desc"],
        "data": [
            {"name":"eDPI","formula":"DPI × sensitivity","desc":"职业选手平均~800 eDPI"},
            {"name":"360°距离(英寸)","formula":"360/(sens×m_yaw×DPI)","desc":"400DPI×2.0: ≈20.45英寸≈52cm"},
            {"name":"开镜灵敏度","formula":"sens×zoom_ratio×(scopeFOV/90)","desc":"AWP一倍: 2.5×1.0×(40/90)≈1.11"},
            {"name":"cm/360°","formula":"2.54×360/(DPI×sens×m_yaw)","desc":"职业选手~30~60cm"},
            {"name":"职业参考","formula":"s1mple:1236, ZywOo:800, device:760","desc":"eDPI值"}
        ]
    },
    "viewShake": {
        "title": "镜头晃动系统",
        "columns": ["类型","触发","幅度","持续","说明"],
        "keys": ["type","trigger","magnitude","duration","desc"],
        "columnTips": {
            "magnitude": "晃动幅度，数值越大屏幕偏移越大，对瞄准干扰越强"
        },
        "data": [
            {"type":"View Punch","trigger":"射击","magnitude":"Recoil×0.45","duration":"射击期间","desc":"准星视觉上抬"},
            {"type":"Aim Punch(无甲)","trigger":"被击中","magnitude":"大幅随机偏移","duration":"~0.3~0.5s","desc":"极大干扰瞄准"},
            {"type":"Aim Punch(有甲)","trigger":"被击中","magnitude":"轻微偏移","duration":"~0.1~0.2s","desc":"护甲核心价值"},
            {"type":"Aim Punch(有甲头部)","trigger":"头部中弹","magnitude":"中等偏移","duration":"~0.2~0.3s","desc":"有头盔仍明显"},
            {"type":"落地冲击","trigger":"高处落地","magnitude":"视角下沉","duration":"~0.3s","desc":"配合精度惩罚0.4s"}
        ]
    },
    "visualEffects": {
        "title": "视觉效果",
        "columns": ["效果","触发","持续","说明"],
        "keys": ["effect","trigger","duration","desc"],
        "data": [
            {"effect":"闪光弹（正面）","trigger":"看到爆炸","duration":"~2.5~3.5s全白","desc":"背对~1s"},
            {"effect":"烟雾弹","trigger":"弹体引爆","duration":"~18s","desc":"半径~288u; 可被火烧散"},
            {"effect":"燃烧弹","trigger":"落地引燃","duration":"~7s","desc":"约40 DPS; 可被烟灭"},
            {"effect":"C4安装","trigger":"安装中","duration":"3.0s","desc":"锁定低头视角"},
            {"effect":"C4拆除","trigger":"拆除中","duration":"5.0/10.0s","desc":"有/无拆弹器"}
        ]
    }
};
