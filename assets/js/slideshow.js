var i = 0; 
var images = [];
var time = 4000;

// Image List
images[0] = 'images/CarInsurance_Home.PNG';
images[1] = 'images/CarInsurance_Quote.PNG';
images[2] = 'images/CarInsurance_Admin.PNG';

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