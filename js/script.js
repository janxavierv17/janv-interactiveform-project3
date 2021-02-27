
const nameFieldInput = document.querySelector('input[id="name"]')
const emailInput = document.querySelector("#email")
const jobRoleInput = document.querySelector('#title')
const otherJobRoleInput = document.querySelector('input[id="other-job-role"]')
const designInput = document.querySelector("#design")
const colorInput = document.querySelector("#color")
const registerForActivities = document.querySelector("#activities")
const total = document.querySelector("#activities-cost")
const paymentMethod = document.querySelector("#payment")
const creditCard = document.querySelector("#credit-card")
const paypal = document.querySelector("#paypal")
const bitCoin = document.querySelector("#bitcoin")
const cardNumberInput = document.querySelector("#cc-num")
const zipCode = document.querySelector("#zip")
const cvv = document.querySelector('input[name="user-cvv"')
const form = document.getElementsByTagName("form")[0]
const activityCheckBoxes = document.querySelectorAll('input[type="checkbox"]')

nameFieldInput.focus();
otherJobRoleInput.style.display = "none"
jobRoleInput.addEventListener("input", (e) => {
    if (e.target.value === "other") {
        otherJobRole.style.display = "block"
    }
})

colorInput.disabled = true;
designInput.addEventListener("input", (e) => {
    if (e.target.value === "js puns") {
        colorInput.disabled = false;
        for (let i = 0; i < colorInput.options.length; i++) {
            colorInput.options[i].removeAttribute("hidden")
            colorInput.options[0].setAttribute("hidden", true)
            if (colorInput.options[i].getAttribute("data-theme") === "heart js") {
                colorInput.options[i].setAttribute("hidden", true)
            }
        }
    } else if (e.target.value === "heart js") {
        colorInput.disabled = false;
        for (let i = 0; i < colorInput.options.length; i++) {
            colorInput.options[i].removeAttribute("hidden")
            colorInput.options[0].setAttribute("hidden", true)
            if (colorInput.options[i].getAttribute("data-theme") === "js puns") {
                colorInput.options[i].setAttribute("hidden", true)
            }
        }
    }

})

let totalCost = 0;
registerForActivities.addEventListener("change", (e) => {
    let dataCost = +e.target.getAttribute("data-cost")
    if (e.target.checked) {
        totalCost = totalCost + dataCost
        console.log(totalCost)
    } else {
        totalCost = totalCost - dataCost
    }
    total.innerHTML = `Total: $${totalCost}`
})

creditCard.setAttribute("hidden", true)
paypal.setAttribute("hidden", true)
bitCoin.setAttribute("hidden", true)
paymentMethod.addEventListener("input", (e) => {
    if (e.target.value === "credit-card") {
        creditCard.removeAttribute("hidden")
        paypal.setAttribute("hidden", true)
        bitCoin.setAttribute("hidden", true)
    } else if (e.target.value === "paypal") {
        paypal.removeAttribute("hidden")
        creditCard.setAttribute("hidden", true)
        bitCoin.setAttribute("hidden", true)
    } else if (e.target.value === "bitcoin") {
        paypal.setAttribute("hidden", true)
        creditCard.setAttribute("hidden", true)
        bitCoin.removeAttribute("hidden")
    }
})
// This function checks to see if "Name" field isn't blank.
const nameValidator = (element, e) => {
    let nameValue = element.value
    let nameInputParent = element.parentNode
    let nameInputLastChild = nameInputParent.lastElementChild
    let nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    if (!nameIsValid) {
        e.preventDefault();
        nameInputParent.classList.add("not-valid")
        nameInputParent.classList.remove("valid")
        nameInputLastChild.style.display = "block"
        return nameIsValid;
    } else if (nameIsValid) {
        nameInputParent.classList.add("valid")
        nameInputParent.classList.remove("not-valid")
        nameInputLastChild.style.display = "none"
        return nameIsValid;
    }

}

// This function checks to see if "Email" field contains a correctly formatted email address.
const emailValidator = (element, e) => {
    let emailValue = element.value;
    let emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue)
    if (!emailIsValid) {
        e.preventDefault();
        return emailIsValid
    }
    return emailIsValid
}

// This function checks to see that at least one activity is selected.
const activitiesValidator = (creditCard, zip, cvv, e) => {
    if (totalCost > 0) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

/* 
    Credit Card Validator functions checks to see if "Credit card" is selected. 
     - Validate credit card number to accept a lenth of 13-16 digits
     - Validate 5 digit zip code
     - Validate 3 digit CVV value
*/
const cardNumberValidator = (element, e) => {
    let cardNum = element.value
    let cardNumIsValid = /^\d{13,16}$/.test(cardNum)
    if (!cardNumIsValid) {
        e.preventDefault();
        return cardNumIsValid;
    }
    return cardNumIsValid;
}

const zipCodeValidator = (element, e) => {
    let zipCodeValue = element.value
    let zipCodeIsValid = /^\d{5}$/.test(zipCodeValue)
    if (!zipCodeIsValid) {
        e.preventDefault();
        return zipCodeIsValid
    }
    return zipCodeIsValid;
}

const cvvValidator = (element, e) => {
    let cvvValue = element.value;
    let cvvIsValid = /^\d{3}$/.test(cvvValue);
    if (!cvvIsValid) {
        e.preventDefault();
        return cvvIsValid;
    }
    return cvvIsValid;
}


form.addEventListener("submit", (e) => {
    nameValidator(nameFieldInput, e)
    emailValidator(emailInput, e)
    cardNumberValidator(cardNumberInput, e)
    zipCodeValidator(zipCode, e)
    cvvValidator(cvv, e)
})

// Provides a feedback mechanism on selected checkbox by giving border a color blue.
for (let i = 0; i < activityCheckBoxes.length; i++) {
    activityCheckBoxes[i].addEventListener("focus", () => {
        let label = activityCheckBoxes[i].parentNode
        label.classList.add("focus")
    })
    activityCheckBoxes[i].addEventListener("blur", () => {
        let label = activityCheckBoxes[i].parentNode
        label.classList.remove("focus")
    })
}