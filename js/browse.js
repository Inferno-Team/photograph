let userId;
$(document).ready(function() {
    userId = localStorage.getItem('photo-token');
    let honeycomb = document.getElementById('honeycomb');
    $.ajax({
        type: "get",
        url: "/photograph/php/get_fields.php",
        success: (response) => {
            let innerHTML = '';
            let json = JSON.parse(response);
            for (let index = 0; index < json.length; index++) {
                const template = createTemplate(json[index].name,
                    `/photograph${json[index].img}`, index + 1);
                innerHTML += template;
            }
            honeycomb.innerHTML = innerHTML;
        }
    });

});

let honeycombCellOnClick = (id) => {
    location.href = `field_photo.html?id=${id}`;
}

let createTemplate = (title, image, index) => {
    return `<div class="honeycomb-cell"
     onclick="honeycombCellOnClick('${index}')" id="${index}">
    <img class="honeycomb-cell__image" src="${image}">
    <div class="honeycomb-cell__title">${title}</div>
</div>`;
}