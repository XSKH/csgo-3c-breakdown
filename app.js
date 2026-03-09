/* ================================================
   CS:GO 3C 数值拆解 — 交互脚本
   Tab 切换 + 公式悬浮窗
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
        });
    });

    // 公式悬浮窗
    var floatEl = document.getElementById('formulaFloat');
    var toggleBtn = document.getElementById('formulaToggleBtn');
    var closeBtn = document.getElementById('formulaCloseBtn');
    var header = document.getElementById('formulaFloatHeader');

    function showFloat() {
        floatEl.classList.add('visible');
        toggleBtn.classList.add('float-active');
    }
    function hideFloat() {
        floatEl.classList.remove('visible');
        toggleBtn.classList.remove('float-active');
    }

    toggleBtn.addEventListener('click', function () {
        if (floatEl.classList.contains('visible')) {
            hideFloat();
        } else {
            showFloat();
        }
    });

    closeBtn.addEventListener('click', function () {
        hideFloat();
    });

    // 拖拽逻辑
    var isDragging = false;
    var dragOffsetX = 0;
    var dragOffsetY = 0;

    header.addEventListener('mousedown', function (e) {
        if (e.target === closeBtn || closeBtn.contains(e.target)) return;
        isDragging = true;
        var rect = floatEl.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        floatEl.style.transition = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        var x = e.clientX - dragOffsetX;
        var y = e.clientY - dragOffsetY;
        // 边界限制
        x = Math.max(0, Math.min(x, window.innerWidth - floatEl.offsetWidth));
        y = Math.max(0, Math.min(y, window.innerHeight - 40));
        floatEl.style.left = x + 'px';
        floatEl.style.top = y + 'px';
        floatEl.style.right = 'auto';
    });

    document.addEventListener('mouseup', function () {
        if (isDragging) {
            isDragging = false;
            floatEl.style.transition = '';
        }
    });

    // ESC 关闭
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && floatEl.classList.contains('visible')) {
            hideFloat();
        }
    });
});
