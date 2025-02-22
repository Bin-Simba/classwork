// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                name: this.querySelector('input[name="name"]').value,
                email: this.querySelector('input[name="email"]').value,
                message: this.querySelector('textarea[name="message"]').value
            };
            
            // Create mailto link
            const mailtoLink = `mailto:shariifbinisimba@gmail.com?subject=Portfolio Contact from ${formData.name}&body=From: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
            window.location.href = mailtoLink;
            
            this.reset();
            alert('Thank you for your message!');
        });
    }

    // Add this to your existing script.js to handle download errors
    document.querySelector('.resume-download .btn').addEventListener('click', function(e) {
        const pdfPath = this.getAttribute('href');
        
        // Check if file exists
        fetch(pdfPath)
            .then(response => {
                if (!response.ok) {
                    e.preventDefault();
                    alert('Resume file is being updated. Please try again later.');
                }
            })
            .catch(error => {
                e.preventDefault();
                alert('Resume file is being updated. Please try again later.');
            });
    });

    // Add PDF generation functionality
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            generatePDF();
        });
    }

    function generatePDF() {
        // Create new PDF document
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Set font styles
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.setTextColor(33, 150, 243); // Blue color for heading

        // Add heading
        doc.text("Bin Simba", 20, 20);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.text("Web Developer", 20, 30);

        // Add Education section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(33, 150, 243);
        doc.text("Education", 20, 50);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("Muteesa I Royal University (2020 - 2024)", 20, 60);
        doc.text("Bachelor of Computer Science", 20, 70);
        doc.text("• Major: Software Engineering", 25, 80);
        doc.text("• GPA: 4.5/5.0", 25, 90);

        // Add Experience section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(33, 150, 243);
        doc.text("Experience", 20, 110);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("Web Developer - Roofings Group (2023 - Present)", 20, 120);
        doc.text("• Developed company's delivery system", 25, 130);
        doc.text("• Improved website performance", 25, 140);

        // Add Technical Skills section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(33, 150, 243);
        doc.text("Technical Skills", 20, 160);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("• HTML5 / CSS3", 25, 170);
        doc.text("• JavaScript / React.js", 25, 180);
        doc.text("• Node.js / MongoDB", 25, 190);
        doc.text("• Git / Version Control", 25, 200);

        // Add contact info
        doc.setFontSize(10);
        doc.text("Email: shariifbinisimba@gmail.com", 20, 220);
        
        // Add footer
        doc.setFontSize(8);
        doc.text("Generated from portfolio website", 20, 280);

        // Save the PDF
        doc.save('BinSimba_Resume.pdf');
    }

    // Simplified typing effect
    const words = ["Web Developer", "Frontend Developer", "UI Designer", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const typingText = document.getElementById('typing-text');
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        const typingSpeed = isDeleting ? 100 : 200;
        setTimeout(type, typingSpeed);
    }
    
    if (typingText) {
        setTimeout(type, 1000);
    }

    // Initialize skill bars
    const skills = document.querySelectorAll('.skill');
    
    skills.forEach(skill => {
        const progressBar = skill.querySelector('.progress-bar');
        const progress = skill.getAttribute('data-progress');
        
        skill.addEventListener('mouseenter', () => {
            // Reset to 0
            progressBar.style.width = '0%';
            
            // Force reflow
            void progressBar.offsetWidth;
            
            // Animate to target percentage
            progressBar.style.width = `${progress}%`;
        });
        
        skill.addEventListener('mouseleave', () => {
            progressBar.style.width = '0%';
        });
    });
}); 