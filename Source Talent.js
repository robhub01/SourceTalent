(function() {
    var popupContainer = document.createElement('div');
    popupContainer.style.position = 'fixed';
    popupContainer.style.top = '10px';
    popupContainer.style.right = '10px';
    popupContainer.style.background = '#f0f0f0';
    popupContainer.style.border = '1px solid #ccc';
    popupContainer.style.borderRadius = '8px';
    popupContainer.style.padding = '20px';
    popupContainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)';
    popupContainer.style.zIndex = '9999';
    popupContainer.innerHTML = `
        <label for="jobTitle"><strong>💼 Job Title:</strong></label><br>
        <input type="text" id="jobTitle" style="width: 100%; margin-bottom: 10px; font-size: 14px;" placeholder="e.g. Data Engineer"><br>
        <label for="skills"><strong>🛠️ Skills:</strong></label><br>
        <input type="text" id="skills" style="width: 100%; margin-bottom: 10px; font-size: 14px;" placeholder="e.g. Python, SQL"><br>
        <label for="targetCompanies"><strong>🏢 Target Companies:</strong></label><br>
        <input type="text" id="targetCompanies" style="width: 100%; margin-bottom: 10px; font-size: 14px;" placeholder="e.g. Meta, Google, Amazon"><br>
        <label for="location"><strong>🌍 Location:</strong></label><br>
        <select id="location" style="width: 100%; margin-bottom: 20px; font-size: 14px;">
            <option value="Anywhere">Anywhere</option>
            <option value="Americas">Americas</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
        </select><br>
        <button id="findTalent" style="background-color: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Find Talent!</button>
        <button id="closePopup" style="background-color: #ccc; color: #333; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-left: 10px;">Close</button><br>
        <div style="text-align: center; font-size: 12px; margin-top: 10px; margin-bottom: 10px; font-style: italic;">
            <br>Created by <a href="https://www.linkedin.com/in/robvhubert/" target="_blank" style="text-decoration: none; color: #007bff;">Rob Hubert</a>
        </div>`;
    
    document.body.appendChild(popupContainer);
    
    function findTalentClick() {
        var jobTitle = document.getElementById('jobTitle').value;
        var skills = document.getElementById('skills').value;
        var targetCompanies = document.getElementById('targetCompanies').value;
        var location = document.getElementById('location').value;
        var unwantedWords = [" of ", " and ", " the", "senior ", "sr ", "sr. ", "&"];
        
        jobTitle = jobTitle.toLowerCase();
        skills = skills.toLowerCase();
        targetCompanies = targetCompanies.toLowerCase();
        
        for (var word of unwantedWords) {
            jobTitle = jobTitle.replace(new RegExp(word, 'g'), '');
            skills = skills.replace(new RegExp(word, 'g'), ' ');
            targetCompanies = targetCompanies.replace(new RegExp(word, 'g'), ' ');
        }
        
        skills = skills.replace(/,/g, '');
        
        var formattedJobTitle = jobTitle.split(' ').map(part => 'inanchor:' + part).join(' ') + ` | ${jobTitle}`;
        
        var formattedTargetCompanies = '';
        if (targetCompanies) {
            var companyList = targetCompanies.split(',');
            var formattedCompanyList = [];
            
            for (var company of companyList) {
                var formattedCompany = company.trim();
                if (formattedCompany) {
                    formattedCompanyList.push(formattedCompany.includes(' ') ? 'inanchor:"' + formattedCompany + '"' : 'inanchor:' + formattedCompany);
                }
            }
            
            formattedTargetCompanies = formattedCompanyList.join(' | ');
        }
        
        var locationParam = '';
        
        if (location === 'Americas') {
            locationParam = '-inurl:uk.* -inurl:de.* -inurl:fr.*';
        } else if (location === 'Europe') {
            locationParam = '(inurl:uk.* | inurl:de.* | inurl:fr.* | inurl:it.* | inurl:es.*)';
        } else if (location === 'Oceania') {
            locationParam = '-"United States" -inurl:uk.*';
        }
        
        var searchQuery = `https://www.google.com/search?q=${encodeURIComponent(formattedJobTitle)} ${encodeURIComponent(skills)} ${encodeURIComponent(formattedTargetCompanies)} ${encodeURIComponent(locationParam)} site:linkedin.com/in&num=100`;

        window.open(searchQuery, '_blank');
    }
    
    function closePopupClick() {
        document.body.removeChild(popupContainer);
    }
    
    document.getElementById('findTalent').addEventListener('click', findTalentClick);
    document.getElementById('closePopup').addEventListener('click', closePopupClick);
})();