document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("http://localhost:5000/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);

        if (result.success) {
          form.reset();
        }
      } catch (error) {
        alert("Something went wrong. Please try again later.");
        console.error("Error:", error);
      }
    });
  }
});