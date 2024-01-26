function validate() {
  const namevalue = document.getElementById("name").value;
  const professionvalue = document.getElementById("profession").value;
  if (namevalue == "" || namevalue == null) {
    window.alert("* Please Fill Name Field");
    console.log("name blank");
    return false;
  } else if (professionvalue == "" || professionvalue == null) {
    window.alert("* Please Fill Profession Field");
    console.log("profession blank");
    return false;
  }
  else {
    return true;
  }
}

function validateAndNavigate() {
  if (validate()) {
    const namevalue = document.getElementById("name").value;
    const professionvalue = document.getElementById("profession").value;
    window.location.href = "./client/home.html?" + namevalue + "|" + professionvalue;
  }
}

const submitbutton = document.getElementById("submit");
submitbutton.addEventListener("click", (e) => {
  console.log("Submit Button Clicked...");
  e.preventDefault();
  validateAndNavigate();
});
