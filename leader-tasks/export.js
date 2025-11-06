/* =======================================
   导出 Excel / CSV
   使用 SheetJS（可选择导出 CSV 或 XLSX）
   ======================================= */

// 导出 CSV（按日期）
function exportCsv(dateStr) {
    if (!dailyData || dailyData.length <= 1) { alert('暂无任务数据'); return; }

    // 过滤指定日期
    const rows = dailyData.slice(1).filter(r => r[0] === dateStr);
    if (rows.length === 0) { alert('该日期没有数据'); return; }

    const header = dailyData[0];
    const all = [header, ...rows];
    const csv = all.map(row => row.map(cell => `"${String(cell||'').replace(/"/g,'""')}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `tasks-${dateStr}.csv`;
    link.click();
}

// 简单 XLSX 导出（需要引入 SheetJS：可选）
// 如果以后需要 xlsx 可以在网页中 <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
// 然后使用下面函数：
function exportXlsx(dateStr) {
    if (!dailyData || dailyData.length <= 1) { alert('暂无任务数据'); return; }

    const rows = dailyData.slice(1).filter(r => r[0] === dateStr);
    if (rows.length === 0) { alert('该日期没有数据'); return; }

    const XLSX = window.XLSX;
    const wb = XLSX.utils.book_new();
    const wsData = [dailyData[0], ...rows];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "tasks");
    XLSX.writeFile(wb, `tasks-${dateStr}.xlsx`);
}
