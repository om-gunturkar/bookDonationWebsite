// script.js

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = {
        'Home': document.querySelector('main'),
        'About': document.querySelector('.about-container'),
        'Donate': document.querySelector('.container'),
        'Contact': document.querySelector('.contact-page')
    };

    function showSection(sectionName) {
        for (let section in sections) {
            if (sections.hasOwnProperty(section)) {
                sections[section].style.display = 'none';
            }
        }
        // Instead of using 'block', use 'flex' for 'Donate' and 'flex' for 'contact-page' and 'block' for others
        if (sectionName === 'Donate' || sectionName === 'Contact') {
            sections[sectionName].style.display = 'flex'; 
        } else {
            sections[sectionName].style.display = 'block';
        }
    }

    function setActiveLink(link) {
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
        });
        link.classList.add('active');
    }

    // Initially show the Home section
    showSection('Home');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionName = this.textContent;
            showSection(sectionName);
            setActiveLink(this);
        });
    });
});