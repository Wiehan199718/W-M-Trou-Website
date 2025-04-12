document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("rsvp-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get form values
        const name = document.getElementById("name").value.trim();
        const attending = document.getElementById("attending").value;

        if (attending === "yes") {
            document.getElementById("family").style.display = "block";
            document.getElementById("message").style.display = "block";
            document.getElementById("email").style.display = "block";
        }

        const email = document.getElementById("email").value.trim();
        const family = document.getElementById("family").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validate inputs
        if (!name || !attending || !email) {
            alert("Vul asseblief alle vereiste velde in.");
            return;
        }

        // Log the form data (you can replace this with an AJAX request to send the data to a server)
        console.log("RSVP Details:");
        console.log("Name:", name);
        console.log("Attending:", attending);
        console.log("Email:", email);
        console.log("Family:", family);
        console.log("Message:", message);

        // Show a success message
        alert("Dankie! Jou RSVP is gestuur.");
        
        // Optionally, reset the form
        form.reset();
    });
});