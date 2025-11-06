 =======================================
   Google Sheet API 脚本
   负责读取和写入 Google Sheet 数据
   ======================================= 

const API_URL = REPLACE_WITH_YOUR_APPS_SCRIPT_URL;  -- 替换成你的 Apps Script Web App URL

let currentUser = null;
let dailyData = null;

 登录验证
async function login() {
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value.trim();

    if (!u  !p) { alert('请填写账号和密码'); return; }

    const users = await apiRead('users');
    const rows = users.slice(1);  排除表头
    for (const r of rows) {
        if (r[0] === u && String(r[1]) === p) {
            currentUser = { username r[0], role r[2], process r[3] };
            document.getElementById('loginBox').classList.add('hidden');
            document.getElementById('taskPage').classList.remove('hidden');
            loadTasks();
            return;
        }
    }
    alert('账号或密码错误');
}

 登出
function logout() {
    currentUser = null;
    document.getElementById('loginBox').classList.remove('hidden');
    document.getElementById('taskPage').clas
