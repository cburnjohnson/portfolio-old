var i = 0; 
var images = [];
var time = 4000;

// Image List
images[0] = 'images/cloud-homepage.png';
images[1] = 'images/cloud-login.png';
images[2] = 'images/cloud-nopics.png';
images[3] = 'images/cloud-pics.png';

// Changes Image

function changeImg(){
    document.slide.src = images[i];

    if(i < images.length - 1)
    {
        i++;
    }
    else
    {
        i =0;
    }

    setTimeout("changeImg()", time);
}

window.onload = changeImg;