let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const daysContainer = document.getElementById("week-container");

days.forEach((day) => {
    daysContainer.innerHTML += `
    <div class="week-day">
        <div data-week-day="${day}" class="day-box collapse-toggle">${day}</div>
        <div class="collapse-menu" id="collapse-menu">
            <div id="${day}" class="collapse-details">
            </div>
        </div>
    </div>
    `;
});

const collapseToggle = document.querySelectorAll('.week-day');

collapseToggle.forEach(toggleBtn => {
    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('active');
    })
})

let weekDay = document.querySelectorAll('[data-week-day]');

document.addEventListener("DOMContentLoaded", getProjects);
daysContainer.addEventListener("click", deleteProjectInfos);

function deleteProjectInfos(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn") {
        e.target.parentElement.remove();
        const projectInfo = item.parentElement;

        removeLocalProjectInfos(projectInfo);
        projectInfo.addEventListener("transitionend", e => {
            projectInfo.remove();
        });
    }
}

// function removeLocalProjectInfos(project) {
//     let projectInfos;
//     if (localStorage.getItem("projects") === null) {
//         projectInfos = [];
//     } else {
//         projectInfos = JSON.parse(localStorage.getItem("projects"));
//     }
//     const projectInfoIndex = project.children[0].innerText;
//     projectInfos.splice(projectInfos.indexOf(projectInfoIndex), 1);
//     localStorage.setItem("projects", JSON.stringify(project));
// }

function getProjects() {
    let projects;
    if (localStorage.getItem("projects") === null) {
        projects = [];
    } else {
        projects = JSON.parse(localStorage.getItem("projects"));
    }
    projects.forEach(function (projects) {
        for (let i = 0; i < weekDay.length; i++) {
            const specificDateBruh = document.getElementById(`${weekDay[i].innerText}`);

            if (projects[0] === weekDay[i].innerText) {
                specificDateBruh.innerHTML = `
                    <div>
                        <div class="project-title">Project</div>
                        <div class="font-14">${projects[1]}</div>
                        <div class="font-14">${projects[2]}</div>
                    </div>
                    
                    <div>
                        <div class="project-title">Description</div>
                        <div class="font-14">${projects[3]}</div>
                    </div>
                `;
            }
        }
    });
}







