document.addEventListener("DOMContentLoaded", function () {
    // 1. Social login check (Google/Github se url me user name aata hai)
    const urlParams = new URLSearchParams(window.location.search);
    const oauthUser = urlParams.get('user');
    const oauthEmail = urlParams.get('email'); // Agar email pass ho rahi ho
    
    if (oauthUser) {
        // Social account save in localstorage
        localStorage.setItem("user", JSON.stringify({ 
            name: decodeURIComponent(oauthUser), 
            email: oauthEmail ? decodeURIComponent(oauthEmail) : "Social Login User" 
        }));
        
        // URL se ?user=... hata do taaki clean lage
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // 2. Check agar local storage me koi bhi user hai
    const userData = localStorage.getItem("user");

    if (userData) {
        const user = JSON.parse(userData);
        
        // 🔥 FIX 1: "undefined" hatane ke liye. Agar 'username' nahi hai toh 'name' check karega.
        const realName = user.username || user.name || user.full_name || "LinuxWallah Student";
        const realEmail = user.email || "No Email";
        
        const avatarUrl = `https://www.gravatar.com/avatar/default?d=identicon&s=100`;

        // 3. Dropdown ke design ki CSS inject karo
        const style = document.createElement('style');
        style.innerHTML = `
            /* Dropdown Container */
            .user-profile-dropdown { position: relative; display: inline-block; cursor: pointer; margin-left: 10px; }
            .user-avatar-container { display: flex; align-items: center; justify-content: center; padding: 2px; border-radius: 50%; transition: transform 0.3s; }
            .user-avatar-container:hover { transform: scale(1.05); }
            
            /* 🔥 FIX 2: ONLY CIRCLE IMAGE (Naam aur arrow hata diya) */
            .nav-user-img { width: 38px; height: 38px; border-radius: 50%; border: 2px solid var(--primary-blue, #0860bb); object-fit: cover; }
            
            /* Dropdown Menu Box */
            .profile-dropdown-menu { display: none; position: absolute; right: 0; top: 120%; background: #111116; border: 1px solid rgba(255,255,255,0.1); min-width: 220px; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.8); z-index: 1000; padding: 10px 0; font-family: 'Montserrat', sans-serif; }
            .profile-dropdown-menu.show { display: block; }
            
            /* Inside Dropdown Data */
            .user-info-header { padding: 10px 15px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 5px; text-align: left; }
            .user-info-name { font-weight: 600; color: #fff; font-size: 0.95rem; margin:0 0 3px 0; }
            .user-info-email { color: #aaa; font-size: 0.8rem; overflow: hidden; text-overflow: ellipsis; margin:0; }
            
            /* Dropdown Buttons */
            .dropdown-item { display: flex; align-items: center; gap: 10px; padding: 10px 15px; color: #fff; text-decoration: none; font-size: 0.9rem; transition: all 0.3s; }
            .dropdown-item:hover { background: rgba(8, 96, 187, 0.15); color: var(--primary-blue, #0860bb); }
            .logout-btn { color: #ff4a4a !important; }
            .logout-btn:hover { background: rgba(255, 74, 74, 0.1) !important; }
            
            /* 🔥 FIX 3: Mobile Layout Adjustments taaki 3-line menu na hate */
            @media (max-width: 768px) {
                .nav-right { gap: 10px !important; display: flex; align-items: center; }
            }
        `;
        document.head.appendChild(style);

        // 4. Desktop/Mobile dono ke liye sirf right side me Dropdown banega (Left ka kachra hata diya)
        const loginBtn = document.querySelector(".login-btn");
        if (loginBtn) {
            const dropdownHTML = `
                <div class="user-profile-dropdown" id="userProfileDropdown">
                    <div class="user-avatar-container">
                        <img src="${avatarUrl}" class="nav-user-img" alt="Profile">
                    </div>
                    
                    <div class="profile-dropdown-menu" id="profileDropdownMenu">
                        <div class="user-info-header">
                            <p class="user-info-name">${realName}</p>
                            <p class="user-info-email">${realEmail}</p>
                        </div>
                        <a href="dashboard.html" class="dropdown-item"><i class="fas fa-desktop"></i> Dashboard</a>
                        <a href="#" class="dropdown-item logout-action logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div>
                </div>
            `;
            
            // Login Button ko Replace kar do
            loginBtn.outerHTML = dropdownHTML;

            // Click Logic (Open/Close Dropdown)
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

        // 5. Logout Logic
        document.querySelectorAll(".logout-action").forEach(button => {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                localStorage.removeItem("user"); // Browser se user data clean karo
                window.location.href = "index.html"; // Home page par waapas bhej do
            });
        });
    }
});
