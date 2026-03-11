/* ================================================
   CS:GO 3C 数值拆解 — 交互脚本
   Tab 切换 + 公式悬浮窗 + 数据驱动渲染
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {
    var navBtns = document.querySelectorAll('.nav-btn[data-tab]');
    var panels = document.querySelectorAll('.tab-panel');

    // Tab 切换
    navBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var target = btn.getAttribute('data-tab');
            navBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            panels.forEach(function (p) { p.classList.remove('active'); });
            var targetPanel = document.getElementById('tab-' + target);
            if (targetPanel) targetPanel.classList.add('active');
            // 切换 tab 后重新构建目录
            buildSideToc();
        });
    });

    // ========== 右侧面板逻辑 ==========
    var overlay = document.getElementById('sidePanelOverlay');
    var formulaPanel = document.getElementById('formulaPanel');
    var dataNotesPanel = document.getElementById('dataNotesPanel');
    var formulaTab = document.getElementById('formulaPanelTab');
    var dataNotesTab = document.getElementById('dataNotesPanelTab');
    var formulaClose = document.getElementById('formulaPanelClose');
    var dataNotesClose = document.getElementById('dataNotesPanelClose');

    function openPanel(panel, tab) {
        // 关闭所有面板
        [formulaPanel, dataNotesPanel].forEach(function (p) { p.classList.remove('visible'); });
        [formulaTab, dataNotesTab].forEach(function (t) { t.classList.remove('active'); });
        // 打开目标面板
        panel.classList.add('visible');
        tab.classList.add('active');
        overlay.classList.add('visible');
    }

    function closeAllPanels() {
        [formulaPanel, dataNotesPanel].forEach(function (p) { p.classList.remove('visible'); });
        [formulaTab, dataNotesTab].forEach(function (t) { t.classList.remove('active'); });
        overlay.classList.remove('visible');
    }

    formulaTab.addEventListener('click', function () {
        if (formulaPanel.classList.contains('visible')) {
            closeAllPanels();
        } else {
            openPanel(formulaPanel, formulaTab);
        }
    });

    dataNotesTab.addEventListener('click', function () {
        if (dataNotesPanel.classList.contains('visible')) {
            closeAllPanels();
        } else {
            openPanel(dataNotesPanel, dataNotesTab);
        }
    });

    formulaClose.addEventListener('click', closeAllPanels);
    dataNotesClose.addEventListener('click', closeAllPanels);
    overlay.addEventListener('click', closeAllPanels);

    // ESC 关闭
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAllPanels();
        }
    });

    // ========== 数据驱动渲染所有 Tab ==========
    var tabConfigs = [
        { dataVar: 'CHARACTER_DATA', containerId: 'character-cards' },
        { dataVar: 'CONTROL_DATA',   containerId: 'control-cards' },
        { dataVar: 'CAMERA_DATA',    containerId: 'camera-cards' },
        { dataVar: 'WEAPON_DATA',    containerId: 'weapon-cards' },
        { dataVar: 'ECONOMY_DATA',   containerId: 'economy-cards' },
        { dataVar: 'GRENADE_DATA',   containerId: 'grenade-cards' }
    ];

    tabConfigs.forEach(function (cfg) {
        var data = window[cfg.dataVar];
        if (data) {
            renderTab(data, cfg.containerId);
        }
    });

    // 初始构建左侧目录（默认激活第一个 tab）
    buildSideToc();

    // 滚动时高亮当前可见卡片对应的目录项
    window.addEventListener('scroll', updateTocActive);
});

/**
 * 通用 Tab 渲染函数
 * @param {Object} data - 数据对象（含 sections 数组定义渲染顺序）
 * @param {string} containerId - 容器元素 ID
 */
function renderTab(data, containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var order = data.sections || Object.keys(data);
    var html = '';

    order.forEach(function (key) {
        if (key === 'sections') return;
        var section = data[key];
        if (!section || !section.columns) return;
        html += buildCard(section, key);
    });

    container.innerHTML = html;
}

/**
 * 计算列组偏移量：返回某个 group 内第 n 列在 columns 数组中的实际索引
 */
function colGroupOffset(groups, targetGroup, n) {
    var offset = 0;
    for (var i = 0; i < groups.length; i++) {
        if (groups[i] === targetGroup) return offset + n;
        offset += groups[i].span;
    }
    return offset + n;
}

/**
 * 构建一个 card 的 HTML
 * @param {Object} section - 单个武器分类的数据
 * @returns {string} HTML 字符串
 */
function buildCard(section, sectionKey) {
    // Pipeline 布局：步骤流程卡片式展示
    if (section.layout === 'pipeline') {
        return buildPipelineCard(section, sectionKey);
    }

    var cardId = sectionKey ? ' id="card-' + sectionKey + '"' : '';
    var html = '<div class="card"' + cardId + '>';
    html += '<h3 class="card-title">' + section.title + '</h3>';

    if (section.desc) {
        html += '<p class="card-desc">' + section.desc + '</p>';
    }

    // 用 table-wrapper 包裹，处理宽表格溢出
    html += '<div class="table-wrapper">';
    html += '<table class="data-table">';

    // thead
    var columnTips = section.columnTips || {};
    var colGroups = section.columnGroups || null;
    // 预计算每列所属的组 class（用于 tbody 着色）
    var colClsMap = [];
    if (colGroups) {
        colGroups.forEach(function (g) {
            for (var n = 0; n < g.span; n++) {
                colClsMap.push(g.cls || '');
            }
        });
    }

    if (colGroups) {
        // 双行表头：第一行为列组，第二行为具体列名
        html += '<thead>';
        // 第一行：组头
        html += '<tr class="col-group-row">';
        colGroups.forEach(function (g) {
            if (g.label) {
                var cls = 'col-group-th' + (g.cls ? ' ' + g.cls : '');
                html += '<th colspan="' + g.span + '" class="' + cls + '">' + g.label + '</th>';
            } else {
                // 空 label 的列占位，与下方列对齐
                for (var n = 0; n < g.span; n++) {
                    html += '<th rowspan="2" class="col-group-empty">' + section.columns[colGroupOffset(colGroups, g, n)] + '</th>';
                }
            }
        });
        html += '</tr>';
        // 第二行：只输出有 label 的组对应的子列
        html += '<tr>';
        var idx = 0;
        colGroups.forEach(function (g) {
            if (g.label) {
                var thCls = g.cls || '';
                for (var j = 0; j < g.span; j++) {
                    var key = section.keys[idx + j];
                    var col = section.columns[idx + j];
                    var thContent = columnTips[key]
                        ? '<span class="term" data-tip="' + columnTips[key] + '">' + col + '</span>'
                        : col;
                    html += '<th' + (thCls ? ' class="' + thCls + '"' : '') + '>' + thContent + '</th>';
                }
            }
            idx += g.span;
        });
        html += '</tr>';
        html += '</thead>';
    } else {
        html += '<thead><tr>';
        section.columns.forEach(function (col, i) {
            var key = section.keys[i];
            if (columnTips[key]) {
                html += '<th><span class="term" data-tip="' + columnTips[key] + '">' + col + '</span></th>';
            } else {
                html += '<th>' + col + '</th>';
            }
        });
        html += '</tr></thead>';
    }

    // tbody
    html += '<tbody>';
    var htmlKeys = section.htmlKeys || [];
    var catColors = section.categoryColors || null;
    var lastCat = null;
    section.data.forEach(function (row) {
        // 分类色块：新类别首行添加分组标题行
        var rowCat = row.cat || null;
        if (catColors && rowCat && rowCat !== lastCat) {
            var catColor = catColors[rowCat] || '#888';
            html += '<tr class="cat-divider-row"><td colspan="' + section.keys.length + '">';
            html += '<span class="cat-dot" style="background:' + catColor + '"></span>';
            html += '<span class="cat-label">' + escapeHtml(rowCat) + '</span>';
            html += '</td></tr>';
            lastCat = rowCat;
        }
        // 行左侧色条
        var rowStyle = '';
        var rowClass = '';
        if (catColors && rowCat) {
            rowStyle = ' style="border-left:3px solid ' + (catColors[rowCat] || '#888') + '"';
        }
        html += '<tr' + rowClass + rowStyle + '>';
        section.keys.forEach(function (key, i) {
            var val = row[key] || '';
            var allowHtml = htmlKeys.indexOf(key) !== -1;
            var cgCls = (colClsMap.length > i && colClsMap[i]) ? colClsMap[i] : '';
            if (i === 0) {
                html += '<td' + (cgCls ? ' class="' + cgCls + '"' : '') + '>' + (allowHtml ? val : escapeHtml(val)) + '</td>';
            } else {
                var vpkTag = '';
                if (row.vpk && row.vpk[key]) {
                    vpkTag = ' <span class="vpk-verified">VPK核实</span>';
                }
                if (row.game && row.game[key]) {
                    vpkTag += ' <span class="game-verified">游戏核实</span>';
                }
                if (row.console && row.console[key]) {
                    vpkTag += ' <span class="console-verified">控制台核实</span>';
                }
                // 最后一列（说明列）不加 val class，允许自由换行；且不转义HTML以支持 tooltip
                var isLastCol = (i === section.keys.length - 1 && section.keys.length > 2);
                var cls = isLastCol ? '' : 'val';
                if (cgCls) cls = cls ? cls + ' ' + cgCls : cgCls;
                var cellContent = (isLastCol || allowHtml) ? val : escapeHtml(val);
                html += '<td' + (cls ? ' class="' + cls + '"' : '') + '>' + cellContent + vpkTag + '</td>';
            }
        });
        html += '</tr>';
    });
    html += '</tbody></table>';
    html += '</div>'; // .table-wrapper

    if (section.note) {
        html += '<p class="card-note">' + section.note + '</p>';
    }

    html += '</div>';
    return html;
}

/**
 * Pipeline 布局：横向步骤流水线 + 下方演算面板
 */
function buildPipelineCard(section, sectionKey) {
    var cardId = sectionKey ? ' id="card-' + sectionKey + '"' : '';
    var html = '<div class="card"' + cardId + '>';
    html += '<h3 class="card-title">' + section.title + '</h3>';

    if (section.desc) {
        html += '<p class="card-desc">' + section.desc + '</p>';
    }

    // === 横向步骤条 ===
    html += '<div class="pl-track">';
    section.data.forEach(function (row, idx) {
        var stepNum = idx + 1;
        var stepName = (row.step || '').replace(/^\d+\.\s*/, '');
        var isLast = idx === section.data.length - 1;

        html += '<div class="pl-node' + (idx === 0 ? ' active' : '') + '" data-pl-idx="' + idx + '">';
        html += '<span class="pl-num">' + stepNum + '</span>';
        html += '<span class="pl-name">' + escapeHtml(stepName) + '</span>';
        html += '<div class="pl-formula">' + (row.formula || '') + '</div>';
        html += '</div>';

        if (!isLast) {
            html += '<div class="pl-arrow"><span class="pl-arrow-line"></span><span class="pl-arrow-head"></span></div>';
        }
    });
    html += '</div>';

    // === 下方演算面板 ===
    html += '<div class="pl-detail">';
    section.data.forEach(function (row, idx) {
        var vpkTag = '';
        if (row.vpk && row.vpk.example) {
            vpkTag = ' <span class="vpk-verified">VPK核实</span>';
        }
        if (row.game && row.game.example) {
            vpkTag += ' <span class="game-verified">游戏核实</span>';
        }
        if (row.console && row.console.example) {
            vpkTag += ' <span class="console-verified">控制台核实</span>';
        }
        var stepName = (row.step || '').replace(/^\d+\.\s*/, '');
        html += '<div class="pl-detail-panel' + (idx === 0 ? ' active' : '') + '" data-pl-panel="' + idx + '">';
        html += '<div class="pl-detail-title">Step ' + (idx + 1) + ' · ' + escapeHtml(stepName) + '</div>';
        html += '<div class="pl-detail-formula">' + (row.formula || '') + '</div>';
        if (row.example) {
            html += '<div class="pl-detail-example">' + row.example + vpkTag + '</div>';
        }
        html += '</div>';
    });
    html += '</div>';

    if (section.note) {
        html += '<p class="card-note">' + section.note + '</p>';
    }

    html += '</div>';
    return html;
}

// Pipeline 交互：点击步骤切换演算面板
document.addEventListener('click', function (e) {
    var node = e.target.closest('.pl-node');
    if (!node) return;
    var idx = node.getAttribute('data-pl-idx');
    var card = node.closest('.card');
    if (!card) return;

    // 切换 active 状态
    card.querySelectorAll('.pl-node').forEach(function (n) { n.classList.remove('active'); });
    node.classList.add('active');

    card.querySelectorAll('.pl-detail-panel').forEach(function (p) { p.classList.remove('active'); });
    var panel = card.querySelector('.pl-detail-panel[data-pl-panel="' + idx + '"]');
    if (panel) panel.classList.add('active');
});

/**
 * HTML 转义，防止 XSS
 */
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
}

/* ========== 全局 Tooltip（position:fixed，不受 overflow 裁剪） ========== */
(function () {
    var tip = document.createElement('div');
    tip.className = 'term-tooltip';
    document.body.appendChild(tip);

    document.addEventListener('mouseenter', function (e) {
        var el = e.target.closest('.term[data-tip]');
        if (!el) return;
        tip.textContent = el.getAttribute('data-tip');
        tip.classList.add('visible');
        positionTip(el);
    }, true);

    document.addEventListener('mouseleave', function (e) {
        var el = e.target.closest('.term[data-tip]');
        if (!el) return;
        tip.classList.remove('visible');
    }, true);

    function positionTip(el) {
        var rect = el.getBoundingClientRect();
        var tipW = tip.offsetWidth;
        var tipH = tip.offsetHeight;

        // 默认显示在元素上方
        var top = rect.top - tipH - 8;
        var left = rect.left + rect.width / 2 - tipW / 2;

        // 如果上方空间不够，改为显示在下方
        if (top < 4) {
            top = rect.bottom + 8;
        }
        // 左右边界修正
        if (left < 4) left = 4;
        if (left + tipW > window.innerWidth - 4) {
            left = window.innerWidth - tipW - 4;
        }

        tip.style.top = top + 'px';
        tip.style.left = left + 'px';
    }
})();

/* ========== 左侧标题目录导航 ========== */
function buildSideToc() {
    var toc = document.getElementById('sideToc');
    if (!toc) return;

    // 找到当前激活的 tab-panel
    var activePanel = document.querySelector('.tab-panel.active');
    if (!activePanel) { toc.innerHTML = ''; return; }

    // 收集该 panel 下所有带 id 的 card
    var cards = activePanel.querySelectorAll('.card[id]');
    var html = '';
    cards.forEach(function (card) {
        var titleEl = card.querySelector('.card-title');
        if (!titleEl) return;
        var title = titleEl.textContent;
        var id = card.id;
        html += '<a class="side-toc-item" data-toc-target="' + id + '">' + escapeHtml(title) + '</a>';
    });
    toc.innerHTML = html;

    // 绑定点击跳转
    toc.querySelectorAll('.side-toc-item').forEach(function (item) {
        item.addEventListener('click', function () {
            var targetId = item.getAttribute('data-toc-target');
            var targetEl = document.getElementById(targetId);
            if (!targetEl) return;
            var headerH = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 0;
            var top = targetEl.getBoundingClientRect().top + window.scrollY - headerH - 16;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    // 立即更新高亮
    updateTocActive();
}

function updateTocActive() {
    var toc = document.getElementById('sideToc');
    if (!toc) return;
    var items = toc.querySelectorAll('.side-toc-item');
    if (!items.length) return;

    var headerH = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 0;
    var scrollTop = window.scrollY + headerH + 40;
    var activeItem = null;

    items.forEach(function (item) {
        var targetId = item.getAttribute('data-toc-target');
        var targetEl = document.getElementById(targetId);
        if (!targetEl) return;
        if (targetEl.offsetTop <= scrollTop) {
            activeItem = item;
        }
    });

    items.forEach(function (item) { item.classList.remove('active'); });
    if (activeItem) {
        activeItem.classList.add('active');
    } else if (items.length) {
        items[0].classList.add('active');
    }
}

/* ========== 置顶按钮 ========== */
(function () {
    var btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
