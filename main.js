let p = 1;
let P_MAX = 4;


function onPrev() { // button previous script
    if (p <= P_MAX && p !== 1) {
        let activePage = document.getElementById('page-' + p);
        activePage.classList.add('d-none');
        if (p === 2) { /*remove previous button, when on page 2 is clicked previous*/
            let pointerPrev = document.getElementById('previousButton');
            pointerPrev.classList.add('d-none')
        } else if (p === 4) { /*add next button, when on page 4 is clicked previous*/
            let pointerNext = document.getElementById('nextButton');
            pointerNext.classList.remove('d-none')
        }
        p--;
        activePage = document.getElementById('page-' + p);
        activePage.classList.remove('d-none');
        pageFix(p); //fixe page number
    }
}

function onNext() { // button next script
    if (p < P_MAX && validation(p)) {
        let activePage = document.getElementById('page-' + p);
        activePage.classList.add('d-none');
        if (p === 1) {/*add previous button, when on page 1 is clicked next*/
            let pointerPrev = document.getElementById('previousButton');
            pointerPrev.classList.remove('d-none')
        } else if (p === 3) {/*remove next button, when on page 3 is clicked next*/
            let pointerNext = document.getElementById('nextButton');
            pointerNext.classList.add('d-none')
        }
        p++;
        activePage = document.getElementById('page-' + p);
        activePage.classList.remove('d-none');
        pageFix(p); //fixe page number
    }
}

function pageFix(p) { // page number change script
    let pageNumber = document.getElementById('current-page');
    pageNumber.textContent = p;

}

function validation(p) { //validation for navigation
    if (p === 1) {
        return validatePage2();
    } else if (p === 2) {
        return validatePage3();
    } else if (p === 3) {
        return validatePage4();
    }
    return false;
}

/*validation start*/
function validateUser(id, pattern) {// one input validation
    let isValid = true;
    let user = document.getElementById(id);
    if (!user.value.match(pattern)) {
        isValid = false;
    }
    return isValid;
}

function feedbackToggle(id, show) {// display feedback on validation and remove
    let feedback = document.getElementById(id);
    if (show) {
        feedback.classList.add('d-block');
    } else {
        feedback.classList.remove('d-block');
    }
}

function clearRadio(name) { //clear radio input
    let radio = document.getElementsByName(name);
    for (let i = 0; i < radio.length; i++) {
        radio[i].checked = false;
    }
}

function clearInput(id) { //clear text/number/date input
    let input = document.getElementById(id);
    input.value = null;
}

function validatePage2() {// page 2 validation
    let textPattern = /^[a-zA-Zაბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]{3,255}$/g;
    let emailPattern = ".+@redberry\.ge$";
    let nameValid = validateUser('userName', textPattern);
    let surnameValid = validateUser('userSurname', textPattern);
    let emailValid = validateUser('emailUser', emailPattern);
    feedbackToggle('invalid-feedback-userName', !nameValid);
    feedbackToggle('invalid-feedback-userSurname', !surnameValid);
    feedbackToggle('invalid-feedback-email', !emailValid);
    return nameValid && surnameValid && emailValid;
}

/* page 3 validation start */
let page3validation = false;
let tested = 0;

function validatePage3() {
    let isValid = page3validation;
    let antibodyCheckedDate = document.getElementById('date-test-yes-date');
    let antibodyCheckedCount = document.getElementById('date-test-yes-count');
    let antibodyNotCheckedDate = document.getElementById('date-test-no-date');
    if (tested === 1) {
        feedbackToggle('invalid-date-test-yes-date', antibodyCheckedDate.value === '');
        feedbackToggle('invalid-date-test-yes-count', antibodyCheckedCount.value === '');
    } else if (tested === 2) {
        feedbackToggle('invalid-date-test-no-date', antibodyNotCheckedDate.value === '');
    }
    if ((antibodyCheckedDate.value !== '' && antibodyCheckedCount.value !== '') || antibodyNotCheckedDate.value !== '') {
        isValid = true;
    }
    return isValid;
}

/* page 3 validation end */

/* page 4 validation start */
let page4validation = false;
let questionVaccination = 0;

function validatePage4() {
    return page4validation;
}

/* page 4 validation end */

/*validation end*/

/*script for page interaction, start*/

/*page 3 start*/
function covidHadYesClean() { //clean everything, not counting first part
    let part2 = document.getElementById('antibodies-status-question');
    part2.classList.add('d-none');
    let part3 = document.getElementById('date-test-yes');
    part3.classList.add('d-none');
    let part4 = document.getElementById('date-test-no');
    part4.classList.add('d-none');
    clearRadio('antibody-test-date');
    clearInput('date-test-yes-date');
    clearInput('date-test-yes-count');
    clearInput('date-test-no-date');
    page3validation = true;
}

function covidHadYes() {
    covidHadYesClean();
    page3validation = false;
    let part2 = document.getElementById('antibodies-status-question');
    part2.classList.remove('d-none');
}

function antibodiesStatusYes() {
    tested = 1;
    let part3 = document.getElementById('date-test-yes');
    part3.classList.remove('d-none');
    let part4 = document.getElementById('date-test-no');
    part4.classList.add('d-none');
    let date=document.getElementById('date-test-yes-date');
    date.required=true;
    let count=document.getElementById('date-test-yes-count');
    count.required=true;
    let covidDate=document.getElementById('date-test-no-date');
    covidDate.required=false;
    clearInput('date-test-no-date');

}

function antibodiesStatusNo() {
    tested = 2;
    let part3 = document.getElementById('date-test-yes');
    part3.classList.add('d-none');
    let part4 = document.getElementById('date-test-no');
    part4.classList.remove('d-none');
    let date=document.getElementById('date-test-yes-date');
    date.required=false;
    let count=document.getElementById('date-test-yes-count');
    count.required=false;
    let covidDate=document.getElementById('date-test-no-date');
    covidDate.required=true;
    clearInput('date-test-yes-date');
    clearInput('date-test-yes-count');
}

/*page 3 end*/

/*page 4 start*/
function vaccinatingPageClean() { //clean everything, not counting first part
    let part2 = document.getElementById('vaccination-level');
    part2.classList.add('d-none');
    let part3 = document.getElementById('vaccinated-once-not-registered');
    part3.classList.add('d-none');
    let part4 = document.getElementById('vaccination-additional-question');
    part4.classList.add('d-none');
    let part5 = document.getElementById('vaccinated-not-panning');
    part5.classList.add('d-none');
    let part6 = document.getElementById('planning-vaccination');
    part6.classList.add('d-none');
}

function vaccinationStatusYes() {
    vaccinatingPageClean();
    let part2 = document.getElementById('vaccination-level');
    part2.classList.remove('d-none');
    clearRadio('not-vaccinated-additional-question');
    if (questionVaccination === 2) {
        page4validation = false;
    }
    questionVaccination = 1;
}

function vaccinationStatusNo() {
    vaccinatingPageClean();
    let part3 = document.getElementById('vaccination-additional-question');
    part3.classList.remove('d-none');
    clearRadio('vaccinated-once-not-registered');
    if (questionVaccination === 1) {
        page4validation = false;
    }
    questionVaccination = 2;
}

function vaccinationLevelClean() {
    let part3 = document.getElementById('vaccinated-once-not-registered');
    part3.classList.add('d-none');
    page4validation = true;
}

function addVaccinationLink() {
    let part3 = document.getElementById('vaccinated-once-not-registered');
    part3.classList.remove('d-none');
    page4validation = true;

}

function additionalQuestionClean() {
    let part5 = document.getElementById('vaccinated-not-panning');
    part5.classList.add('d-none');
    let part6 = document.getElementById('planning-vaccination');
    part6.classList.add('d-none');
    page4validation = true;
}

function showSearch() {
    let part5 = document.getElementById('vaccinated-not-panning');
    part5.classList.remove('d-none');
    let part6 = document.getElementById('planning-vaccination');
    part6.classList.add('d-none');
    page4validation = true;
}

function showVaccinationLink() {
    let part5 = document.getElementById('vaccinated-not-panning');
    part5.classList.add('d-none');
    let part6 = document.getElementById('planning-vaccination');
    part6.classList.remove('d-none');
    page4validation = true;
}

/*page 4 end*/
/*script for page interaction, end*/