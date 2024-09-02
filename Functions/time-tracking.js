document.getElementById('module').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('feedbackModal').style.display = 'block';
});

document.getElementsByClassName('close')[0].onclick = function() {
    document.getElementById('feedbackModal').style.display = 'none';
}

const form = document.querySelector("#feedbackFrame");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const entries = Object.fromEntries(data.entries());
    const project = entries

    document.getElementById('feedbackModal').style.display = 'none';

    const date = new Date(project.date);
    let dayName = date.toLocaleDateString("en-us", {weekday: "long"});

    saveLocalProjects([dayName, project.name, project.time, project.desc]);
    form.reset();
    window.location.href = "survey.html";
})

function saveLocalProjects(projectInfo) {
    let projects;
    if (localStorage.getItem("projects") === null) {
        projects = [];
    } else {
        projects = JSON.parse(localStorage.getItem("projects"));
    }
    projects.push(projectInfo);
    localStorage.setItem("projects", JSON.stringify(projects));
}