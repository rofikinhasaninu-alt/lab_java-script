alert("Welcome to my portfolio website!");

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded");

   
    class Profile {
        constructor(name, role) {
            this.name = name;
            this.role = role;
        }
        introduce() {
            return `${this.name} - ${this.role}`;
        }
    }

  
    const profile = new Profile("Sa Ni", "Frontend Developer Student");
    
    // Set hero section
    const heroName = document.getElementById("heroName");
    const heroRole = document.getElementById("heroRole");
    const profileName = document.getElementById("profileName");
    const profileRole = document.getElementById("profileRole");
    
    if (heroName) heroName.textContent = profile.name;
    if (heroRole) heroRole.textContent = profile.role;
    if (profileName) profileName.textContent = profile.name;
    if (profileRole) profileRole.textContent = profile.role;
    
    console.log(profile.introduce());

  
    document.cookie = "visitor=PortfolioViewer";


    const toggleAboutBtn = document.getElementById("toggleAboutBtn");
    const aboutContent = document.getElementById("aboutContent");

    if (toggleAboutBtn && aboutContent) {
        toggleAboutBtn.addEventListener("click", function() {
            aboutContent.classList.toggle("hidden");
            if (aboutContent.classList.contains("hidden")) {
                toggleAboutBtn.textContent = "Show";
                toggleAboutBtn.style.backgroundColor = "#28a745";
            } else {
                toggleAboutBtn.textContent = "Hide";
                toggleAboutBtn.style.backgroundColor = "#007bff";
            }
        });
    } else {
        console.error("Toggle About button or About Content not found!");
    }

  
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "enabled") {
        body.classList.add("dark-mode");
        if (darkModeToggle) darkModeToggle.textContent = " Light Mode";
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function() {
            body.classList.toggle("dark-mode");
            const isDark = body.classList.contains("dark-mode");
            darkModeToggle.textContent = isDark ? " Light Mode" : "Dark Mode";
            localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
        });
    }

    const skillInput = document.getElementById("skillInput");
    const addSkillBtn = document.getElementById("addSkillBtn");
    const skillList = document.getElementById("skillList");

    if (addSkillBtn && skillInput && skillList) {
        addSkillBtn.addEventListener("click", function() {
            const newSkill = skillInput.value.trim();
            if (newSkill === "") {
                alert("Please enter a skill name");
                return;
            }
            const li = document.createElement("li");
            li.textContent = newSkill;
            skillList.appendChild(li);
            skillInput.value = "";
            console.log("Added skill:", newSkill);
        });
    } else {
        console.error("Add Skill elements not found!");
    }

   
    const contactForm = document.getElementById("contactForm");
    const contactName = document.getElementById("contactName");
    const contactEmail = document.getElementById("contactEmail");
    const contactAge = document.getElementById("contactAge");
    const contactMsg = document.getElementById("contactMsg");
    const ageError = document.getElementById("ageError");
    const formResult = document.getElementById("formResult");

    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Validate Age
            const age = parseInt(contactAge.value);
            if (isNaN(age) || age < 18 || age > 60) {
                if (ageError) ageError.textContent = "Age must be between 18 and 60";
                return;
            }
            if (ageError) ageError.textContent = "";
            
            // Validate Name length
            if (contactName.value.length < 3) {
                alert("Name must be at least 3 characters");
                return;
            }
            
          
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(contactEmail.value)) {
                alert("Please enter a valid email address");
                return;
            }
            
            // Validate Message length
            if (contactMsg.value.length < 10) {
                alert("Message must be at least 10 characters");
                return;
            }
            
            // Save to localStorage
            localStorage.setItem("contactName", contactName.value);
            localStorage.setItem("contactEmail", contactEmail.value);
            
            // Save to sessionStorage as draft
            sessionStorage.setItem("lastMessage", contactMsg.value);
            
            if (formResult) {
                formResult.textContent = " Message sent successfully!";
                setTimeout(function() {
                    formResult.textContent = "";
                }, 3000);
            }
            
            contactForm.reset();
        });
    }

   
    const visitorName = document.getElementById("visitorName");
    const saveLocalBtn = document.getElementById("saveLocalBtn");
    const localResult = document.getElementById("localResult");

    // Load saved name on page load
    const savedName = localStorage.getItem("visitorName");
    if (savedName && localResult) {
        localResult.textContent = savedName;
    }

    if (saveLocalBtn && visitorName && localResult) {
        saveLocalBtn.addEventListener("click", function() {
            const name = visitorName.value.trim();
            if (name) {
                localStorage.setItem("visitorName", name);
                localResult.textContent = name;
                visitorName.value = "";
            } else {
                alert("Please enter a name");
            }
        });
    }

   
    const draftMessage = document.getElementById("draftMessage");
    const saveSessionBtn = document.getElementById("saveSessionBtn");
    const sessionResult = document.getElementById("sessionResult");

    // Load saved draft on page load
    const savedDraft = sessionStorage.getItem("draftMessage");
    if (savedDraft && sessionResult && draftMessage) {
        sessionResult.textContent = savedDraft;
        draftMessage.value = savedDraft;
    }

    if (saveSessionBtn && draftMessage && sessionResult) {
        saveSessionBtn.addEventListener("click", function() {
            const draft = draftMessage.value.trim();
            if (draft) {
                sessionStorage.setItem("draftMessage", draft);
                sessionResult.textContent = draft;
            } else {
                alert("Please write a draft message");
            }
        });
    }

    const locationBtn = document.getElementById("locationBtn");
    const locationResultDiv = document.getElementById("locationResult");

    if (locationBtn && locationResultDiv) {
        locationBtn.addEventListener("click", function() {
            if (navigator.geolocation) {
                locationResultDiv.innerHTML = "Getting your location...";
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                locationResultDiv.innerHTML = " Geolocation is not supported by this browser.";
            }
        });
    }

    function showPosition(position) {
        const locationResultDiv = document.getElementById("locationResult");
        if (locationResultDiv) {
            locationResultDiv.innerHTML = `
                <strong>Latitude:</strong> ${position.coords.latitude}<br>
                <strong>Longitude:</strong> ${position.coords.longitude}<br>
                <strong>Accuracy:</strong> ${position.coords.accuracy} meters
            `;
        }
    }

    function showError(error) {
        const locationResultDiv = document.getElementById("locationResult");
        let message = "";
        switch(error.code) {
            case error.PERMISSION_DENIED:
                message = "Permission denied. Please allow location access.";
                break;
            case error.POSITION_UNAVAILABLE:
                message = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                message = "Location request timed out.";
                break;
            default:
                message = "An unknown error occurred.";
        }
        if (locationResultDiv) locationResultDiv.innerHTML = ` ${message}`;
    }

    const fetchBtn = document.getElementById("fetchBtn");
    const axiosBtn = document.getElementById("axiosBtn");
    const apiResult = document.getElementById("apiResult");

    if (fetchBtn && apiResult) {
        fetchBtn.addEventListener("click", function() {
            apiResult.innerHTML = "<p>Loading users with Fetch API...</p>";
            
            fetch("https://jsonplaceholder.typicode.com/users")
                .then(function(response) {
                    if (!response.ok) throw new Error("HTTP error " + response.status);
                    return response.json();
                })
                .then(function(users) {
                    displayUsers(users.slice(0, 6));
                })
                .catch(function(error) {
                    apiResult.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
                });
        });
    }

 
    if (axiosBtn && apiResult && typeof axios !== 'undefined') {
        axiosBtn.addEventListener("click", function() {
            apiResult.innerHTML = "<p>Loading user with Axios...</p>";
            
            axios.get("https://jsonplaceholder.typicode.com/users/1")
                .then(function(response) {
                    displayUsers([response.data]);
                })
                .catch(function(error) {
                    apiResult.innerHTML = `<p style="color: red;">Axios Error: ${error.message}</p>`;
                });
        });
    }

  
    function displayUsers(users) {
        const apiResult = document.getElementById("apiResult");
        if (!apiResult) return;
        
        apiResult.innerHTML = "";
        users.forEach(function(user) {
            const card = document.createElement("div");
            card.className = "user-card";
            card.innerHTML = `
                <h3 style="color: #007bff; margin-bottom: 8px;">${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
            `;
            apiResult.appendChild(card);
        });
    }


    const parseBtn = document.getElementById("parseBtn");
    const parseResult = document.getElementById("parseResult");

    if (parseBtn && parseResult) {
        parseBtn.addEventListener("click", function() {
            const jsonString = `{
                "name": "John Doe",
                "age": 25,
                "city": "Phnom Penh",
                "skills": ["HTML", "CSS", "JavaScript", "React"],
                "isStudent": false
            }`;
            
            const parsedObject = JSON.parse(jsonString);
            parseResult.textContent = JSON.stringify(parsedObject, null, 2);
            console.log("Parsed Object:", parsedObject);
        });
    }

 
    const stringifyBtn = document.getElementById("stringifyBtn");
    const stringifyResult = document.getElementById("stringifyResult");

    if (stringifyBtn && stringifyResult) {
        stringifyBtn.addEventListener("click", function() {
            const myPortfolio = {
                name: "Sok Dara",
                role: "Frontend Developer",
                yearsOfExperience: 2,
                skills: ["JavaScript", "HTML/CSS", "Tailwind", "React"],
                isAvailable: true,
                projects: [
                    { name: "Portfolio Website", year: 2025 },
                    { name: "E-commerce App", year: 2026 }
                ]
            };
            
            const jsonString = JSON.stringify(myPortfolio, null, 2);
            stringifyResult.textContent = jsonString;
            console.log("Stringified JSON:", jsonString);
        });
    }


    const screenWidth = document.getElementById("screenWidth");
    const screenHeight = document.getElementById("screenHeight");
    const browserName = document.getElementById("browserName");
    const cookieText = document.getElementById("cookieText");

  

    // Welcome message
    console.log("All features loaded successfully!");
});