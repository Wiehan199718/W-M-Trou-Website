document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("rsvp-form");
    const attendingSelect = document.getElementById("attending");
    const familyDiv = document.getElementById("family-div");
    const messageDiv = document.getElementById("message-div");
    const emailDiv = document.getElementById("email-div");
    const formMessage = document.getElementById('form-message');
    const submitButton = document.getElementById('submit-button');

    // Function to toggle visibility based on attending selection
    const toggleVisibility = () => {
        if (attendingSelect.value === "yes") {
            familyDiv.style.display = "block";
            messageDiv.style.display = "block";
            emailDiv.style.display = "block";
        } else {
            familyDiv.style.display = "none";
            messageDiv.style.display = "none";
            emailDiv.style.display = "none";
        }
    };

    // Initial check on page load
    toggleVisibility();

    // Add event listener to handle changes in the dropdown
    attendingSelect.addEventListener("change", toggleVisibility);

    // Google Sheet Form Submission

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitButton.disabled = true;
            if (formMessage) {
                formMessage.textContent = 'Sending...';
            }

            const formData = new FormData(form);
            const scriptURL = 'https://script.google.com/macros/s/AKfycbx79Ok2OQA_z__0Fc9R0Fgl3wueP2Ar8N5Y7qWL2mcu50BpdBb5mbGNGivw5fTWYG8PGw/exec'; // Replace with your Web App URL

            fetch(scriptURL, { method: 'POST', body: formData})
                .then(response => response.json()) // Assuming Apps Script returns JSON
                .then(data => {
                    console.log('Success:', data);
                    if(formMessage) {
                        setTimeout(() => {
                            formMessage.textContent = 'RSVP Sent! Thank you.';
                        }, 3000); // Clear message after 3 seconds
                    }
                    if(formMessage) {
                        formMessage.style.color = 'green';
                    }
                    // Reset the form fields
                    form.reset();
                    familyDiv.style.display = "none";
                    messageDiv.style.display = "none";
                    emailDiv.style.display = "none";
                    // Optionally, you can redirect the user or show a success message
                    submitButton.disabled = false;
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    if(formMessage) formMessage.textContent = 'Oops! Something went wrong. Please try again.';
                    if(formMessage) formMessage.style.color = 'red';
                    submitButton.disabled = false;
                });
        });
    }

});