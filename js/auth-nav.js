document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Debugging line - Isse hum console me dekh paenge ki URL me kya-kya aaya hai
    console.log("URL Parameters received:", Object.fromEntries(urlParams.entries()));

    // Cloudflare Workers alag-alag keys bhejte hain, hum sab check karenge
    const oauthUser = urlParams.get('user') || urlParams.get('username') || urlParams.get('name');
    const oauthEmail = urlParams.get('email');
    
    if (oauthUser) {
        // Agar URL me data mila, to save karo
        const userObj = { 
            username: decodeURIComponent(oauthUser), 
            email: oauthEmail ? decodeURIComponent(oauthEmail) : "User (Social Account)" 
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        
        // URL se query params saaf karo taaki refresh karne par purana data glitch na kare
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Ab localStorage se fetch karo
    const userData = localStorage.getItem("user");

    if (userData) {
        const user = JSON.parse(userData);
        console.log("Loaded User Data from LocalStorage:", user);

        // 🔥 CRITICAL FIX FOR UNDEFINED: Har possible key fallback check karo
        const realName = user.username || user.name || user.full_name || "LinuxWallah Student";
        const realEmail = user.email || "hello@linuxwallah.in";
        
        const avatarUrl = `https://www.gravatar.com/avatar/default?d=identicon&s=100`;

        // Style Injector
        const style = document.createElement('style');
        style.innerHTML = `
            .user-profile-dropdown { position: relative; display: inline-block; cursor: pointer; margin-left: 10px; vertical-align: middle; }
            .user-avatar-container { display: flex; align-items: center; justify-content: center; padding: 2px; }
            .nav-user-img { width: 38px; height: 38px; border-radius: 50%; border: 2px solid var(--primary-blue, #0860bb); object-fit: cover; background: #222; }
            .profile-dropdown-menu { display: none; position: absolute; right: 0; top: 125%; background: #111116; border: 1px solid rgba(255,255,255,0.1); min-width: 240px; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.8); z-index: 9999; padding: 10px 0; font-family: 'Montserrat', sans-serif; }
            .profile-dropdown-menu.show { display: block; }
            .user-info-header { padding: 12px 15px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 5px; text-align: left; }
            .user-info-name { font-weight: 600; color: #fff; font-size: 0.95rem; margin: 0 0 4px 0; }
            .user-info-email { color: #888; font-size: 0.8rem; margin: 0; word-break: break-all; }
            .dropdown-item { display: flex; align-items: center; gap: 10px; padding: 10px 15px; color: #fff; text-decoration: none; font-size: 0.9rem; transition: all 0.3s; text-align: left; }
            .dropdown-item:hover { background: rgba(8, 96, 187, 0.15); color: var(--primary-blue, #0860bb); }
            .logout-btn { color: #ff4a4a !important; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 5px; }
            .logout-btn:hover { background: rgba(255, 74, 74, 0.1) !important; }
        `;
        document.head.appendChild(style);

        // Replace Login Button
        const loginBtn = document.querySelector(".login-btn");
        if (loginBtn) {
            const dropdownHTML = `
                <div class="user-profile-dropdown" id="userProfileDropdown">
                    <div class="user-avatar-container">
                        <img src="${avatarUrl}" class="nav-user-img" alt="Profile">
                    </div>
                    <div class="profile-dropdown-menu" id="profileDropdownMenu">
                        <div class="user-info-header">
                            <p class="user-info-name" id="dropdown-user-name">${realName}</p>
                            <p class="user-info-email" id="dropdown-user-email">${realEmail}</p>
                        </div>
                        <a href="dashboard.html" class="dropdown-item"><i class="fas fa-desktop"></i> Dashboard</a>
                        <a href="#" class="dropdown-item logout-action logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div>
                </div>
            `;
            loginBtn.outerHTML = dropdownHTML;

            const dropContainer = document.getElementById("userProfileDropdown");
            const dropMenu = document.getElementById("profileDropdownMenu");
            
            dropContainer.addEventListener("click", function (e) {
                e.stopPropagation();
                dropMenu.classList.toggle("show");
            });

            document.addEventListener("click", function () {
                dropMenu.classList.remove("show");
            });
        }

        // Logout Logic
        document.querySelectorAll(".logout-action").forEach(button => {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                localStorage.removeItem("user");
                window.location.href = "index.html";
            });
        });
    }
});
