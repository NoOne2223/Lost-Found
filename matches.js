document.addEventListener("DOMContentLoaded", () => {
    const matchesTable = document.getElementById("matchesTable");
    const langToggle = document.getElementById("langToggle");
    const themeToggle = document.getElementById("themeToggle");
    const exportBtn = document.getElementById("exportBtn");
    const body = document.body;

    body.classList.add("light-mode");
    body.setAttribute("data-lang", "en");
    themeToggle.textContent = "🌙 Dark Mode";

    // بيانات تجريبية
    const lostReports = [
        {id:1, item:"Black Bag", category:"Bags", status:"Pending", date:"2026-02-10", reporter:"Ahmad Ali", contact:"ahmad@example.com"},
        {id:2, item:"iPhone", category:"Electronics", status:"Verified", date:"2026-02-11", reporter:"Sara Khalid", contact:"sara@example.com"}
    ];

    const foundReports = [
        {id:1, item:"Wallet", category:"Bags", status:"Pending", date:"2026-02-15", finder:"Omar Saleh", contact:"omar@example.com"},
        {id:2, item:"Laptop", category:"Electronics", status:"Verified", date:"2026-02-16", finder:"Lina Ahmad", contact:"lina@example.com"}
    ];

    // دالة حساب التشابه
    function similarity(str1, str2) {
        const set1 = new Set(str1.toLowerCase().split(" "));
        const set2 = new Set(str2.toLowerCase().split(" "));
        const intersection = [...set1].filter(x => set2.has(x));
        const union = new Set([...set1, ...set2]);
        return Math.round((intersection.length / union.size) * 100);
    }

    // عرض النتائج
    function renderMatches(lang="en") {
        matchesTable.innerHTML = "";
        lostReports.forEach(lost => {
            foundReports.forEach(found => {
                const simItem = similarity(lost.item, found.item);
                const simCategory = similarity(lost.category, found.category);
                const avgSim = Math.round((simItem + simCategory) / 2);

                if (avgSim > 30) {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>
                            <h4 style="color:var(--danger)">${lang==="ar" ? "بلاغ مفقود" : "Lost Report"}</h4>
                            <div class="field"><span class="label">${lang==="ar" ? "المعرف" : "ID"}:</span><span class="value">${lost.id}</span></div>
                            <div class="field"><span class="label">${lang==="ar" ? "الغرض" : "Item"}:</span><span class="value">${lost.item}</span></div>
                            <div class="field"><span class="label">${lang==="ar" ? "الفئة" : "Category"}:</span><span class="value">${lost.category}</span></div>
                            <div class="field"><span class="label">${lang==="ar" ? "الحالة" : "Status"}:</span><span class="value">${lost.status}</span></div>
                            <div class="field"><span class="label">${lang==="ar" ? "التاريخ" : "Date"}:</span><span class="value">${lost.date}</span></div>
                            <div class="field"><span class="label">${lang==="ar" ? "المبلّغ" : "Reporter"}:</span><span class="value">${lost.reporter}</span></div>
                            <div class="field"><span class="label">${lang==="ar" ? "التواصل" : "Contact"}:</span><span class="value">${lost.contact}</span></div>
                        </td>
                        <td>
                            <h4 style="color:var(--success)">${lang==="ar" ? "بلاغ معثور" : "Found Report"}</h4>
                            <div class="field"><span class="label">${lang==="ar" ? "المعرف" : "ID"}:</span><span class="value">${found.id}</span></div>
                            <div class="field"><span class="label">${lang==="ar" ? "الغرض" : "Item"}:</span><span class="value">${found.item}</span></div>
                            <div class="field"><span class="label">${lang==="ar" ? "الفئة" : "Category"}:</span><span class="value">${found.category}</span></div>
                            <div class="field"><span class="label">${lang==="ar" ? "الحالة" : "Status"}:</span><span class="value">${found.status}</span></div>
                            <div class="field"><span class="label">${lang==="ar" ? "التاريخ" : "Date"}:</span><span class="value">${found.date}</span></div>
                            <div class="field"><span class="label">${lang==="ar" ? "المُعثر" : "Finder"}:</span><span class="value">${found.finder}</span></div>
                            <div class="field"><span class="label">${lang==="ar" ? "التواصل" : "Contact"}:</span><span class="value">${found.contact}</span></div>
                        </td>
                        <td><strong>${avgSim}%</strong></td>
                    `;
                    matchesTable.appendChild(row);
                }
            });
        });
    }

    renderMatches("en");

    // ===== تبديل اللغة =====
    langToggle.addEventListener("click", (e) => {
        e.preventDefault();

        if (body.getAttribute("data-lang") === "en") {
            body.setAttribute("data-lang", "ar");
            langToggle.textContent = "🌐 EN";

            document.getElementById("pageTitle").textContent = "المطابقات (للمسؤول)";
            document.getElementById("tableTitle").textContent = "مطابقات المفقودات والمعثورات";

            // ترجمة الهيدر
            document.getElementById("thLost").textContent = "بلاغ مفقود";
            document.getElementById("thFound").textContent = "بلاغ معثور";
            document.getElementById("thSim").textContent = "نسبة التشابه";

            exportBtn.textContent = "تصدير كـ PDF";
            renderMatches("ar");

            themeToggle.textContent = body.classList.contains("light-mode") ? "🌙 الوضع الداكن" : "💡 الوضع الفاتح";

        } else {
            body.setAttribute("data-lang", "en");
            langToggle.textContent = "🌐 AR";

            document.getElementById("pageTitle").textContent = "Matches (Admin)";
            document.getElementById("tableTitle").textContent = "Lost & Found Matches";

            // ترجمة الهيدر
            document.getElementById("thLost").textContent = "Lost Report";
            document.getElementById("thFound").textContent = "Found Report";
            document.getElementById("thSim").textContent = "Similarity %";

            exportBtn.textContent = "Export as PDF";
            renderMatches("en");

            themeToggle.textContent = body.classList.contains("light-mode") ? "🌙 Dark Mode" : "💡 Light Mode";
        }
    });

    // ===== تبديل الثيم =====
    themeToggle.addEventListener("click", (e) => {
        e.preventDefault();

        if (body.classList.contains("light-mode")) {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");

            themeToggle.textContent = body.getAttribute("data-lang") === "ar" ? "💡 الوضع الفاتح" : "💡 Light Mode";
        } else {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");

            themeToggle.textContent = body.getAttribute("data-lang") === "ar" 
                ? "🌙 الوضع الداكن" 
                : "🌙 Dark Mode";
        }
    });

    // ===== فتح/إغلاق قائمة الإعدادات =====
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    dropdownToggle.addEventListener("click", (e) => {
        e.preventDefault();
        dropdownMenu.classList.toggle("show");
    });

    // ===== Export PDF =====
    exportBtn.addEventListener("click", () => {
        window.print(); // يفتح نافذة الطباعة، المستخدم يختار PDF
    });
});