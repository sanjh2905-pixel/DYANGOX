

let currentStep = 1;

let patientData = {

    symptoms: "",

    duration: "",

    additionalInfo: "",

    history: "",

    medications: "",

    allergies: "",

    reports: [],

    priority: "MEDIUM",

    patientID: ""

};


/* =========================================
   PATIENT / DOCTOR SWITCH
========================================= */

function showPatient() {

    const patientFlow =
        document.getElementById("patientFlow");

    const doctorFlow =
        document.getElementById("doctorFlow");

    const patientBtn =
        document.getElementById("patientBtn");

    const doctorBtn =
        document.getElementById("doctorBtn");


    patientFlow.classList.remove("hidden");

    doctorFlow.classList.add("hidden");

    patientBtn.classList.add("active");

    doctorBtn.classList.remove("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showDoctor() {

    const patientFlow =
        document.getElementById("patientFlow");

    const doctorFlow =
        document.getElementById("doctorFlow");

    const patientBtn =
        document.getElementById("patientBtn");

    const doctorBtn =
        document.getElementById("doctorBtn");


    patientFlow.classList.add("hidden");

    doctorFlow.classList.remove("hidden");

    patientBtn.classList.remove("active");

    doctorBtn.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   PATIENT STEP NAVIGATION
========================================= */
function nextStep(step) {

    currentStep = step;

    const screens =
        document.querySelectorAll(".patient-screen");

    screens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    const target =
        document.getElementById("step" + step);

    if (target) {
        target.classList.add("active");
    }

    updateProgress(step);
    updateStepText(step);
    updatePatientSubtitle(step);

    /* =====================================
       GENERATE LIVE ASSESSMENT
    ===================================== */

    if (step === 6) {
        renderAssessment();
    }

    window.scrollTo({
        top:
            document.querySelector(".patient-wrapper").offsetTop - 100,
        behavior: "smooth"
    });
}



/* =========================================
   PROGRESS
========================================= */

function updateProgress(step) {

    const progressItems =
        document.querySelectorAll(".progress-item");


    progressItems.forEach(function(item, index) {

        const itemStep = index + 1;

        if (itemStep <= step) {

            item.classList.add("active");

        } else {

            item.classList.remove("active");

        }

    });

}


function updateStepText(step) {

    const stepText =
        document.getElementById("stepText");

    stepText.innerText =
        "Step " + step;

}


function updatePatientSubtitle(step) {

    const subtitle =
        document.getElementById("patientSubtitle");

    const title =
        document.getElementById("patientTitle");


    const content = {

        1: {
            title: "Let's understand how you're feeling.",
            subtitle: "Tell us what you're experiencing."
        },

        2: {
            title: "Tell Care AI what you're experiencing.",
            subtitle: "Describe your symptoms using text or voice."
        },

        3: {
            title: "A few quick questions.",
            subtitle: "Your answers help structure the assessment."
        },

        4: {
            title: "Your medical background matters.",
            subtitle: "Add relevant medical history."
        },

        5: {
            title: "Add supporting reports.",
            subtitle: "Upload previous medical documents if available."
        },

        6: {
            title: "Review your assessment.",
            subtitle: "Check the information before generating your ID."
        },

        7: {
            title: "Assessment successfully completed.",
            subtitle: "Your unique CareFlow patient ID is ready."

        }

    };


    if (content[step]) {

        title.innerText =
            content[step].title;

        subtitle.innerText =
            content[step].subtitle;

    }

}


/* =========================================
   STEP 2 — SYMPTOMS
========================================= */

function saveSymptoms() {

    const input =
        document.getElementById("symptomsInput");

    const symptoms =
        input.value.trim();


    if (!symptoms) {

        showMessage(
            "Please describe at least one symptom."
        );

        input.focus();

        return;
    }


    patientData.symptoms = symptoms;


    showMessage(
        "Symptoms recorded successfully."
    );


    nextStep(3);

}


/* =========================================
   LANGUAGE
========================================= */

function setLanguage(language, button) {

    const buttons =
        document.querySelectorAll(".language");

    buttons.forEach(function(btn) {

        btn.classList.remove("active");

    });


    button.classList.add("active");


    if (language === "Hindi") {

        document.getElementById("symptomsInput").placeholder =
            "उदाहरण: मुझे तीन दिनों से सिरदर्द, हल्का बुखार और कमजोरी है...";

    } else {

        document.getElementById("symptomsInput").placeholder =
            "Example: I have headache, mild fever and weakness since three days...";

    }

}


/* =========================================
   VOICE INPUT
========================================= */

function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        showMessage(
            "Voice input is not supported in this browser."
        );

        return;
    }


    const recognition =
        new SpeechRecognition();


    recognition.lang =
        "en-IN";

    recognition.continuous =
        false;

    recognition.interimResults =
        false;


    const status =
        document.getElementById("voiceStatus");

    const voiceText =
        document.getElementById("voiceText");


    if (status) {

        status.innerText =
            "Listening...";

        status.style.color =
            "#ffc857";

    }


    if (voiceText) {

        voiceText.innerText =
            "Listening...";

    }


    recognition.start();


    recognition.onresult =
        function(event) {

            const transcript =
                event.results[0][0].transcript;


            const symptomsInput =
                document.getElementById("symptomsInput");


            if (symptomsInput) {

                symptomsInput.value +=
                    (symptomsInput.value ? " " : "") +
                    transcript;

            }


            showMessage(
                "Voice captured successfully."
            );

        };


    recognition.onerror =
        function() {

            showMessage(
                "Unable to capture voice. Please try again."
            );

        };


    recognition.onend =
        function() {

            if (status) {

                status.innerText =
                    "Voice ready";

                status.style.color =
                    "";

            }


            if (voiceText) {

                voiceText.innerText =
                    "Speak";

            }

        };

}


/* =========================================
   STEP 3 — DURATION
========================================= */

function selectDuration(duration, button) {

    const buttons =
        document.querySelectorAll(".answer-grid button");


    buttons.forEach(function(btn) {

        btn.classList.remove("selected");

    });


    button.classList.add("selected");


    patientData.duration =
        duration;

}


function saveQuestion() {

    if (!patientData.duration) {

        showMessage(
            "Please select how long you've had the symptoms."
        );

        return;
    }


    const additional =
        document
            .getElementById("additionalInfo")
            .value
            .trim();


    patientData.additionalInfo =
        additional;


    showMessage(
        "Answer recorded."
    );


    nextStep(4);

}


/* =========================================
   STEP 4 — HISTORY
========================================= */

function saveHistory() {

    patientData.history =
        document
            .getElementById("historyInput")
            .value
            .trim();


    patientData.medications =
        document
            .getElementById("medicationsInput")
            .value
            .trim();


    patientData.allergies =
        document
            .getElementById("allergiesInput")
            .value
            .trim();


    showMessage(
        "Medical history saved."
    );


    nextStep(5);

}


/* =========================================
   STEP 5 — FILE UPLOAD
========================================= */

const reportInput =
    document.getElementById("reportInput");


if (reportInput) {

    reportInput.addEventListener(
        "change",
        function(event) {

            handleFiles(event.target.files);

        }
    );

}


function handleFiles(files) {

    const fileArray =
        Array.from(files);


    fileArray.forEach(function(file) {

        if (file.size > 10 * 1024 * 1024) {

            showMessage(
                file.name + " is larger than 10MB."
            );

            return;

        }


        const alreadyExists =
            patientData.reports.some(
                function(existing) {

                    return existing.name === file.name;

                }
            );


        if (!alreadyExists) {

            patientData.reports.push(file);

        }

    });


    renderFileList();

}


function renderFileList() {

    const fileList =
        document.getElementById("fileList");


    if (!fileList) return;


    fileList.innerHTML = "";


    patientData.reports.forEach(
        function(file, index) {

            const item =
                document.createElement("div");

            item.className =
                "file-item";


            item.innerHTML = `

                <div class="file-info">

                    <div class="file-icon">
                        📎
                    </div>

                    <span class="file-name">
                        ${escapeHTML(file.name)}
                    </span>

                </div>

                <button
                    class="file-remove"
                    onclick="removeFile(${index})">

                    Remove

                </button>

            `;


            fileList.appendChild(item);

        }
    );

}


function removeFile(index) {

    patientData.reports.splice(
        index,
        1
    );


    renderFileList();

    showMessage(
        "File removed."
    );

}


function saveReports() {

    showMessage(
        patientData.reports.length
            ? "Reports attached successfully."
            : "No reports added."
    );


    nextStep(6);

}


function skipReports() {

    patientData.reports = [];

    nextStep(6);

}


/* =========================================
   DRAG & DROP
========================================= */

const uploadZone =
    document.getElementById("uploadZone");


if (uploadZone) {

    uploadZone.addEventListener(
        "dragover",
        function(event) {

            event.preventDefault();

            uploadZone.classList.add("dragging");

        }
    );


    uploadZone.addEventListener(
        "dragleave",
        function() {

            uploadZone.classList.remove("dragging");

        }
    );


    uploadZone.addEventListener(
        "drop",
        function(event) {

            event.preventDefault();

            uploadZone.classList.remove("dragging");

            handleFiles(event.dataTransfer.files);

        }
    );

}


/* =========================================
   STEP 6 — ASSESSMENT
========================================= */

function buildSymptoms() {

    const originalText =
        patientData.symptoms.trim();

    if (!originalText) {
        return ["Symptoms not specified"];
    }

    const text =
        originalText.toLowerCase();

    const knownSymptoms = [
        "breathing difficulty",
        "chest pain",
        "stomach pain",
        "sore throat",
        "headache",
        "fever",
        "cough",
        "cold",
        "fatigue",
        "weakness",
        "vomiting",
        "nausea",
        "dizziness",
        "pain",
        "pain in heart"
    ];

    const found = [];

    knownSymptoms.forEach(function(symptom) {

        if (text.includes(symptom)) {

            

            if (
                symptom === "pain" &&
                (
                    text.includes("chest pain") ||
                    text.includes("stomach pain")
                )
            ) {
                return;
            }

            found.push(
                capitalize(symptom)
            );
        }

    });

   

    if (found.length > 0) {
        return found;
    }

  

    return [originalText];
}


function calculatePriority() {

    const text =
        patientData.symptoms
            .toLowerCase();


    if (
        text.includes("chest pain") ||
        text.includes("breathing difficulty") ||
        text.includes("unconscious") ||
        text.includes("severe bleeding")
    ) {

        return "HIGH";

    }


    if (
        text.includes("fever") ||
        text.includes("vomiting") ||
        text.includes("severe pain") ||
        text.includes("dizziness")
    ) {

        return "MEDIUM";

    }


    return "LOW";

}


function renderAssessment() {

    const symptoms =
        buildSymptoms();


    const container =
        document.getElementById(
            "assessmentSymptoms"
        );


    container.innerHTML = "";


    symptoms.forEach(
        function(symptom) {

            const item =
                document.createElement("div");

            item.className =
                "symptom-item";


            item.innerHTML = `

                <span>•</span>

                <strong>
                    ${escapeHTML(symptom)}
                </strong>

            `;


            container.appendChild(item);

        }
    );


    patientData.priority =
        calculatePriority();


    updatePriorityUI();

}


function updatePriorityUI() {

    const priority =
        patientData.priority;


    const dot =
        document.querySelector(
            ".priority-dot"
        );


    const strong =
        document.querySelector(
            ".priority-display strong"
        );


    const description =
        document.querySelector(
            ".priority-display p"
        );


    dot.className =
        "priority-dot " +
        priority.toLowerCase();


    strong.innerText =
        priority;


    if (priority === "HIGH") {

        strong.style.color =
            "#ff6b7a";

        dot.style.background =
            "#ff6b7a";

        description.innerText =
            "Prompt clinical review recommended.";

    } else if (priority === "MEDIUM") {

        strong.style.color =
            "#ffc857";

        dot.style.background =
            "#ffc857";

        description.innerText =
            "Routine medical review recommended.";

    } else {

        strong.style.color =
            "#48e0a4";

        dot.style.background =
            "#48e0a4";

        description.innerText =
            "Non-urgent clinical review recommended.";

    }

}


/* =========================================
   GENERATE PATIENT ID
========================================= */

function generatePatientID() {

    const random =
        Math.floor(
            10000 +
            Math.random() * 90000
        );


    const year =
        new Date()
            .getFullYear();


    patientData.patientID =
        `CF-${year}-${random}`;


    document.getElementById(
        "generatedID"
    ).innerText =
        patientData.patientID;


    savePatientData();


    showMessage(
        "Patient ID generated successfully."
    );


    nextStep(7);

}


/* =========================================
   SAVE DATA
========================================= */

function savePatientData() {

    const serializableData = {

        symptoms:
            patientData.symptoms,

        duration:
            patientData.duration,

        additionalInfo:
            patientData.additionalInfo,

        history:
            patientData.history,

        medications:
            patientData.medications,

        allergies:
            patientData.allergies,

        reports:
            patientData.reports.map(
                function(file) {

                    return {
                        name: file.name,
                        size: file.size,
                        type: file.type
                    };

                }
            ),

        priority:
            patientData.priority,

        patientID:
            patientData.patientID,

        createdAt:
            new Date().toISOString()

    };


    localStorage.setItem(
        "careflow_patient",
        JSON.stringify(
            serializableData
        )
    );

}


/* =========================================
   LOAD PATIENT
========================================= */

function loadPatient() {

    const input =
        document.getElementById(
            "patientID"
        );


    const enteredID =
        input.value
            .trim()
            .toUpperCase();


    if (!enteredID) {

        showMessage(
            "Please enter a Patient ID."
        );

        return;

    }


    const saved =
        localStorage.getItem(
            "careflow_patient"
        );


    if (!saved) {

        showMessage(
            "No patient record found."
        );

        return;

    }


    const data =
        JSON.parse(saved);


    if (
        enteredID !==
        data.patientID.toUpperCase()
    ) {

        showMessage(
            "Patient not found. Check the ID."
        );

        document
            .getElementById("doctorRecord")
            .classList.add("hidden");

        document
            .getElementById("doctorEmpty")
            .classList.remove("hidden");

        return;

    }


    renderDoctorRecord(data);

}


/* =========================================
   DOCTOR RECORD
========================================= */

function renderDoctorRecord(data) {

    document
        .getElementById("doctorEmpty")
        .classList.add("hidden");


    document
        .getElementById("doctorRecord")
        .classList.remove("hidden");


    document.getElementById(
        "doctorPatientID"
    ).innerText =
        data.patientID;


    const symptomContainer =
        document.getElementById(
            "doctorSymptoms"
        );


    symptomContainer.innerHTML = "";


    const symptoms =
        extractSymptomsFromText(
            data.symptoms
        );


    symptoms.forEach(
        function(symptom) {

            const element =
                document.createElement("div");

            element.className =
                "doctor-symptom";

            element.innerText =
                symptom;

            symptomContainer.appendChild(
                element
            );

        }
    );


    document.getElementById(
        "doctorHistory"
    ).innerHTML = `

        <strong>
            Existing conditions:
        </strong>

        ${escapeHTML(
            data.history ||
            "None provided."
        )}

        <br><br>

        <strong>
            Medications:
        </strong>

        ${escapeHTML(
            data.medications ||
            "None provided."
        )}

        <br><br>

        <strong>
            Allergies:
        </strong>

        ${escapeHTML(
            data.allergies ||
            "None provided."
        )}

        <br><br>

        <strong>
            Symptom duration:
        </strong>

        ${escapeHTML(
            data.duration ||
            "Not specified."
        )}

    `;


    renderDoctorReports(
        data.reports
    );


    document.getElementById(
        "aiSummary"
    ).innerHTML = `

        Patient reports
        <strong>
            ${escapeHTML(data.symptoms)}
        </strong>.

        Symptoms have been reported for
        <strong>
            ${escapeHTML(data.duration || "an unspecified duration")}
        </strong>.

        Based on the entered information, the
        preliminary CareFlow priority is

        <strong>
            ${escapeHTML(data.priority)}
        </strong>.

        ${data.additionalInfo
            ? `
                Additional information:
                ${escapeHTML(data.additionalInfo)}
              `
            : ""
        }

        The information should be reviewed alongside
        the patient's history and uploaded documents.

    `;


    showMessage(
        "Patient record loaded successfully."
    );

}


/* =========================================
   DOCTOR REPORTS
========================================= */

function renderDoctorReports(reports) {

    const container =
        document.getElementById(
            "doctorReports"
        );


    const count =
        document.getElementById(
            "reportCount"
        );


    container.innerHTML = "";


    count.innerText =
        reports.length;


    if (!reports.length) {

        container.innerHTML = `

            <div class="history-result">
                No reports uploaded by the patient.
            </div>

        `;

        return;

    }


    reports.forEach(
        function(report) {

            const element =
                document.createElement("div");

            element.className =
                "doctor-report";


            element.innerHTML = `

                <div class="doctor-report-left">

                    <div class="doctor-report-icon">
                        📎
                    </div>

                    <span class="doctor-report-name">
                        ${escapeHTML(report.name)}
                    </span>

                </div>

                <button
                    class="view-report"
                    onclick="showMessage('Demo preview: ${escapeHTML(report.name)}')">

                    VIEW

                </button>

            `;


            container.appendChild(
                element
            );

        }
    );

}


/* =========================================
   DECISION
========================================= */

function selectDecision(
    decision,
    button
) {

    const buttons =
        document.querySelectorAll(
            ".decision-option"
        );


    buttons.forEach(
        function(btn) {

            btn.classList.remove(
                "selected"
            );

        }
    );


    button.classList.add(
        "selected"
    );


    document.getElementById(
        "selectedDecision"
    ).innerText =
        "Selected: " + decision;


    patientData.doctorDecision =
        decision;

}


function saveDecision() {

    const decision =
        patientData.doctorDecision;


    const notes =
        document
            .getElementById("doctorNotes")
            .value
            .trim();


    if (!decision) {

        showMessage(
            "Please select a clinical decision."
        );

        return;

    }


    localStorage.setItem(
        "careflow_doctor_decision",
        JSON.stringify({

            decision:
                decision,

            notes:
                notes,

            savedAt:
                new Date().toISOString()

        })
    );


    showMessage(
        "✓ Clinical decision saved successfully."
    );

}


/* =========================================
   PREVIOUS VISIT
========================================= */

function showPreviousVisit() {

    const saved =
        localStorage.getItem(
            "careflow_patient"
        );


    if (!saved) {

        showMessage(
            "No previous visit found on this device."
        );

        return;

    }


    const data =
        JSON.parse(saved);


    showDoctor();


    document.getElementById(
        "patientID"
    ).value =
        data.patientID;


    loadPatient();

}


/* =========================================
   COPY PATIENT ID
========================================= */

function copyPatientID() {

    const id =
        document.getElementById(
            "generatedID"
        ).innerText;


    navigator.clipboard
        .writeText(id)
        .then(
            function() {

                showMessage(
                    "Patient ID copied."
                );

            }
        )
        .catch(
            function() {

                showMessage(
                    "Unable to copy automatically."
                );

            }
        );

}


/* =========================================
   RESET
========================================= */

function resetAssessment() {

    patientData = {

        symptoms: "",

        duration: "",

        additionalInfo: "",

        history: "",

        medications: "",

        allergies: "",

        reports: [],

        priority: "MEDIUM",

        patientID: ""

    };


    document.getElementById(
        "symptomsInput"
    ).value = "";


    document.getElementById(
        "additionalInfo"
    ).value = "";


    document.getElementById(
        "historyInput"
    ).value = "";


    document.getElementById(
        "medicationsInput"
    ).value = "";


    document.getElementById(
        "allergiesInput"
    ).value = "";


    document.getElementById(
        "fileList"
    ).innerHTML = "";


    nextStep(1);

    showPatient();

}


/* =========================================
   TOAST
========================================= */

let toastTimeout;


function showMessage(text) {

    const toast =
        document.getElementById(
            "message"
        );


    toast.querySelector("p")
        .innerText =
        text;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            function() {

                toast.classList.remove(
                    "show"
                );

            },
            2800
        );

}


/* =========================================
   HELPERS
========================================= */

function capitalize(text) {

    return text.charAt(0).toUpperCase() +
        text.slice(1);

}


function extractSymptomsFromText(text) {

    const lower =
        text.toLowerCase();


    const known = [

        "headache",
        "fever",
        "cough",
        "cold",
        "fatigue",
        "weakness",
        "vomiting",
        "nausea",
        "pain",
        "dizziness",
        "breathing difficulty",
        "chest pain",
        "stomach pain",
        "sore throat"

    ];


    const result = [];


    known.forEach(
        function(symptom) {

            if (
                lower.includes(symptom)
            ) {

                result.push(
                    capitalize(symptom)
                );

            }

        }
    );


    if (!result.length) {

        result.push(
            text || "Not specified"
        );

    }


    return result;

}


function escapeHTML(text) {

    if (text === undefined ||
        text === null) {

        return "";

    }


    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showPatient();

        updateProgress(1);

        updateStepText(1);

        updatePatientSubtitle(1);

    }
);