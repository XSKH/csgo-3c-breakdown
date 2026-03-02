/* ================================================
   CS:GO 3C 数值拆解 — 交互脚本
   Tab 切换逻辑
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {
    var navBtns = document.querySelectorAll('.nav-btn');
    var panels = document.querySelectorAll('.tab-panel');

    navBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var target = btn.getAttribute('data-tab');

            // 更新按钮激活状态
            navBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            // 切换面板显示
            panels.forEach(function (p) { p.classList.remove('active'); });
            var targetPanel = document.getElementById('tab-' + target);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});
