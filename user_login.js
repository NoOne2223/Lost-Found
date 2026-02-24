document.addEventListener("DOMContentLoaded", () => {
    const heroContent = document.querySelector(".hero-content");
    const buttons = document.querySelectorAll(".buttons .btn-lost, .buttons .btn-found");
  
    // إضافة كلاس جاهز للأنيميشن
    heroContent.classList.add("fade-in");
  
    // تأخير بسيط للأزرار عشان يدخلوا بشكل مرتب
    buttons.forEach((btn, index) => {
      setTimeout(() => {
        btn.classList.add("fade-in-up");
      }, 300 * (index + 1));
    });
    document.addEventListener("DOMContentLoaded", () => {
        const toggler = document.querySelector(".navbar-toggler");
        const menu = document.querySelector("#navbarContent");
      
        toggler.addEventListener("click", () => {
          if (menu.classList.contains("show")) {
            menu.classList.remove("fade-in");
          } else {
            menu.classList.add("fade-in");
          }
        });
      });
      
  });

  