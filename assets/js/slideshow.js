var i = 0; 
var images = [];
var time = 3000;

// Image List
images[0] = 'images/Optimized-cloud-homepage.png';
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



var iTwo = 0; 
var imagesTwo = [];

// Image List
imagesTwo[0] = 'images/carinsurance.png';
imagesTwo[1] = 'images/carinsurance-quote.png';
imagesTwo[2] = 'images/carinsurance-admin.png';

// Changes Image

function changeImgSecond(){
    document.slidetwo.src = imagesTwo[iTwo];

    if(iTwo < imagesTwo.length - 1)
    {
        iTwo++;
    }
    else
    {
        iTwo =0;
    }

    setTimeout("changeImgSecond()", time);
}

window.onload= changeImg();
window.onload= changeImgSecond();