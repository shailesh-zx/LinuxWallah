document.addEventListener("DOMContentLoaded", function () { 
    const urlParams = new URLSearchParams(window.location.search); 
    
    // 🔴 ERROR CHECKER: Agar Backend se koi error aata hai
    const authError = urlParams.get('error');
    const authDesc = urlParams.get('desc');
    
    if (authError) {
        alert("⚠️ OAUTH LOGIN FAILED!\n\nError: " + authError + "\nDetails: " + (authDesc || "No details provided.") + "\n\n(Cloudflare Dashboard me API Keys / Client Secret check karein)");
        window.history.replaceState({}, document.title, window.location.pathname);
        return; 
    }

    const oauthUser = urlParams.get('user'); 
    const oauthEmail = urlParams.get('email'); 
    
    // 1. Agar Social Login se data aaya hai to save karo
    if (oauthUser && oauthUser !== "undefined") { 
        let cleanName = decodeURIComponent(oauthUser).trim().replace(/\s+/g, '-').toLowerCase();
        const randomString = Math.random().toString(36).substring(2, 6);
        let generatedUsername = `${cleanName}-${randomString}`;

        const userObj = {  
            username: generatedUsername,  
            email: (oauthEmail && oauthEmail !== "undefined") ? decodeURIComponent(oauthEmail) : "No Email Provided"  
        }; 

        localStorage.setItem("user", JSON.stringify(userObj)); 
        
        // 👉 Bas URL ko saaf karo (redirect mat karo, user index.html par hi rahega)
        window.history.replaceState({}, document.title, window.location.pathname); 
    } 

    // 2. LocalStorage se user check karo aur UI (Dropdown) update karo
    const userData = localStorage.getItem("user"); 

    if (userData) { 
        try { 
            const user = JSON.parse(userData); 
            
            let realName = user.username ? user.username : "Student"; 
            let realEmail = user.email ? user.email : "No Email"; 
            
            // Style Injector 
            const style = document.createElement('style'); 
            style.innerHTML = ` 
                .user-profile-dropdown { position: relative; display: inline-block; cursor: pointer; margin-left: 10px; vertical-align: middle; } 
                .nav-user-img { width: 38px; height: 38px; border-radius: 50%; border: 2px solid #0860bb; object-fit: cover; background: #222; display: block; } 
                .profile-dropdown-menu { display: none; position: absolute; right: 0; top: 125%; background: #111116; border: 1px solid rgba(255,255,255,0.1); min-width: 240px; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.8); z-index: 9999; padding: 10px 0; font-family: 'Montserrat', sans-serif; } 
                .profile-dropdown-menu.show { display: block; } 
                .user-info-header { padding: 12px 15px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 5px; text-align: left; } 
                .user-info-name { font-weight: 600; color: #fff; font-size: 0.95rem; margin: 0 0 4px 0; text-transform: capitalize; } 
                .user-info-email { color: #888; font-size: 0.8rem; margin: 0; word-break: break-all; } 
                .dropdown-item { display: block; padding: 10px 15px; color: #fff; text-decoration: none; font-size: 0.9rem; transition: all 0.3s; text-align: left; } 
                .dropdown-item:hover { background: rgba(8, 96, 187, 0.15); color: #0860bb; } 
                .logout-btn { color: #ff4a4a !important; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 5px; } 
                .logout-btn:hover { background: rgba(255, 74, 74, 0.1) !important; } 
            `; 
            document.head.appendChild(style); 

            // Replace Login Button with User Info Dropdown
            const loginBtn = document.querySelector(".login-btn"); 
            if (loginBtn) { 
                loginBtn.outerHTML = ` 
                    <div class="user-profile-dropdown" id="userProfileDropdown"> 
                        <img src="https://www.gravatar.com/avatar/default?d=identicon&s=100" class="nav-user-img"> 
                        <div class="profile-dropdown-menu" id="profileDropdownMenu"> 
                            <div class="user-info-header"> 
                                <p class="user-info-name">${realName}</p> 
                                <p class="user-info-email">${realEmail}</p> 
                            </div> 
                            <a href="dashboard.html" class="dropdown-item">Dashboard</a> 
                            <a href="#" class="dropdown-item logout-action logout-btn">Logout</a> 
                        </div> 
                    </div> 
                `; 

                // Dropdown Toggle Logic
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

            // Logout Button Code 
            document.querySelectorAll(".logout-action").forEach(button => { 
                button.addEventListener("click", function (e) { 
                    e.preventDefault(); 
                    localStorage.removeItem("user"); 
                    window.location.href = "index.html"; 
                }); 
            }); 

        } catch(e) { 
            console.error("Data error, clearing storage"); 
            localStorage.removeItem("user"); 
        } 
    } 
});
