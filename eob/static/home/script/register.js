personal_button = document.getElementById("id_organization_0");
organization_button = document.getElementById("id_organization_1");
organization_element = document.getElementsByClassName("organization-choice");
personal_element = document.getElementsByClassName("personal-choice");

organization_button.addEventListener("click", function () {
  if (organization_element && organization_button.checked) {
    Array.from(organization_element).forEach((element) => {
      element.style.display = "block";
    });
    Array.from(personal_element).forEach((element) => {
      element.style.display = "none";
    });
  }
});

personal_button.addEventListener("click", function () {
  if (personal_element && personal_button.checked) {
    Array.from(personal_element).forEach((element) => {
      element.style.display = "block";
    });
    Array.from(organization_element).forEach((element) => {
      element.style.display = "none";
    });
  }
});

agree_policy_button = document.getElementById("id_agree_policy");
register_submit_button = document.getElementsByClassName("register-submit");

agree_policy_button.addEventListener("click", function () {
  if (agree_policy_button.checked) {
    register_submit_button[0].disabled = false;
    register_submit_button[0].style.backgroundColor = "#1c2d5a";
  } else {
    register_submit_button[0].disabled = true;
    register_submit_button[0].style.backgroundColor = "#5f6f9c";
  }
});
