/*
document.addEventListener("DOMContentLoaded", function () {
    // 1. Social login check (Google/Github se url me user name aata hai)
    const urlParams = new URLSearchParams(window.location.search);
    const oauthUser = urlParams.get('user');
    
    if (oauthUser) {
        // Social account save in localstorage
        localStorage.setItem("user", JSON.stringify({ username: decodeURIComponent(oauthUser), email: "User (Social Login)" }));
        
        // URL se ?user=... hata do taaki clean lage
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // 2. Check agar local storage me koi bhi user hai
    const userData = localStorage.getItem("user");

    if (userData) {
        const user = JSON.parse(userData);
        const avatarUrl = `https://www.gravatar.com/avatar/default?d=identicon&s=100`;

        // 3. Dropdown ke design ki CSS inject karo
        const style = document.createElement('style');
        style.innerHTML = `
            .user-profile-dropdown { position: relative; display: inline-block; cursor: pointer; margin-left: 15px; }
            .user-avatar-container { display: flex; align-items: center; gap: 8px; padding: 5px 10px; border-radius: 5px; transition: background 0.3s; }
            .user-avatar-container:hover { background: rgba(255,255,255,0.1); }
            .nav-user-img { width: 35px; height: 35px; border-radius: 50%; border: 2px solid var(--primary-blue, #0860bb); object-fit: cover; }
            .nav-username { color: var(--text-color); font-size: 0.95rem; font-weight: 500; }
            .profile-dropdown-menu { display: none; position: absolute; right: 0; top: 110%; background: var(--bg-color); border: 1px solid rgba(255,255,255,0.1); min-width: 220px; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); z-index: 1000; padding: 10px 0; font-family: 'Montserrat', sans-serif; }
            .profile-dropdown-menu.show { display: block; }
            .user-info-header { padding: 10px 15px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 5px; }
            .user-info-name { font-weight: 600; color: var(--text-color); font-size: 0.95rem; margin:0; }
            .user-info-email { color: #888; font-size: 0.8rem; overflow: hidden; text-overflow: ellipsis; margin:0; }
            .dropdown-item { display: flex; align-items: center; gap: 10px; padding: 10px 15px; color: var(--text-color); text-decoration: none; font-size: 0.9rem; transition: all 0.3s; }
            .dropdown-item:hover { background: rgba(8, 96, 187, 0.15); color: var(--primary-blue, #0860bb); }
            .logout-btn { color: #ff4a4a !important; }
            .logout-btn:hover { background: rgba(255, 74, 74, 0.1) !important; }
            
            /* Mobile Styles */
            .mobile-user-box { display: flex; align-items: center; gap: 12px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 15px; border-left: 4px solid var(--primary-blue, #0860bb); }
            .mobile-user-details { display: flex; flex-direction: column; }
            .mobile-logout { padding-left: 15px; margin-top: 10px; display: inline-flex; align-items: center; gap: 8px; color: #ff4a4a; text-decoration: none; font-size: 0.95rem; font-weight: 500; }
        `;
        document.head.appendChild(style);

        // 4. Desktop Navbar se "Login" hatao aur Icon daalo
        const loginBtn = document.querySelector(".login-btn");
        if (loginBtn) {
            const dropdownHTML = `
                <div class="user-profile-dropdown" id="userProfileDropdown">
                    <div class="user-avatar-container">
                        <img src="${avatarUrl}" class="nav-user-img" alt="User">
                        <span class="nav-username">${user.username.split(' ')[0]}</span>
                        <i class="fas fa-caret-down" style="color:#aaa; font-size:0.8rem;"></i>
                    </div>
                    <div class="profile-dropdown-menu" id="profileDropdownMenu">
                        <div class="user-info-header">
                            <p class="user-info-name">${user.username}</p>
                            <p class="user-info-email">${user.email}</p>
                        </div>
                        <a href="dashboard.html" class="dropdown-item"><i class="fas fa-desktop"></i> Dashboard</a>
                        <a href="#" class="dropdown-item logout-action logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div>
                </div>
            `;
            // Button ko Dropdown menu me convert karo
            loginBtn.outerHTML = dropdownHTML;

            // Click karne par menu open/close ho
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

        // 5. Mobile Hamburger ke andar Icon daalo
        const navLinksMenu = document.getElementById("navLinks");
        if (navLinksMenu) {
            const mobileUserHtml = document.createElement("div");
            mobileUserHtml.className = "mobile-profile-section";
            mobileUserHtml.innerHTML = `
                <div class="mobile-user-box">
                    <img src="${avatarUrl}" class="nav-user-img" alt="User">
                    <div class="mobile-user-details">
                        <span class="user-info-name">${user.username}</span>
                        <span class="user-info-email">${user.email}</span>
                    </div>
                </div>
                <a href="#" class="mobile-logout logout-action"><i class="fas fa-sign-out-alt"></i> Logout</a>
                <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 15px 0;">
            `;
            // Hamburger menu me sabse upar fit karo
            navLinksMenu.insertBefore(mobileUserHtml, navLinksMenu.firstChild);
        }

        // 6. Logout Logic (Jab Logout dabaenge toh kya hoga)
        document.querySelectorAll(".logout-action").forEach(button => {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                localStorage.removeItem("user"); // Browser se user data clean karo
                window.location.href = "index.html"; // Home page par waapas bhej do
            });
        });
    }
});
*/
