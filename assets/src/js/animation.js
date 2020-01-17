import $ from 'jquery';

const gsap = require('gsap');

$(document).ready(function () {

    const Timeline = gsap.TimelineMax;
    let mouseListener;

    const smallLineHeight1 = 125;
    const smallLineHeight2 = 100;
    const smallLineHeight3 = 63;
    const smallLineHeight4 = 120;
    const smallLineHeight5 = 140;
    const documentHeight = $("body").innerHeight();

    const screenLines = $('.screen-lines__item');
    const contentItems = $('.content-inner-item');
    const screenImg = $('.screen-img__item');
    let linesInd = 0;
    let contentInd = 0;
    let imgInd = 0;
    screenLines.each(function () {
        $(this).attr('id', 'screen-lines__item-' + linesInd);
        if ($(this).children('.screen-lines__move').length > 0) {
            let movedId = 0;
            let movedLines = $(this).children('.screen-lines__move');
            movedLines.each(function () {
                $(this).attr('id', 'screen-lines__move-' + linesInd + '-' + movedId);
                movedId++;
            });
        }
        linesInd++;
    });
    contentItems.each(function () {
        $(this).attr('id', 'contentItem-' + contentInd);
        contentInd++
    });
    screenImg.each(function () {
        $(this).attr('id', 'screenImg-' + imgInd);
        imgInd++;
    });

    function welcomeLines() {
        const welcomLines = new Timeline();
        welcomLines
            .fromTo('#screen-lines__move-0-0', 0.5, {height: 0}, {height: smallLineHeight1}, 0)
            .fromTo('#screen-lines__move-1-0', 0.5, {height: 0}, {height: smallLineHeight2}, 0)
            .fromTo('#screen-lines__move-2-0', 0.5, {height: 0}, {height: smallLineHeight3}, 0)
            .fromTo('#screen-lines__move-3-0', 0.5, {height: 0}, {height: smallLineHeight4}, 0)
            .fromTo('#screen-lines__move-4-0', 0.5, {height: 0}, {height: smallLineHeight5}, 0)
    };

    function welcomeContent(){
        const welcomContent = new Timeline();
        welcomContent
            .fromTo('#contentItem-0', 0.5, {y: -50, opacity: 0, display: "none"}, {
                y: 0,
                opacity: 1,
                display: "block"
            }, 0)
            .fromTo('#screenImg-0', 0.5, {y: 50, opacity: 0, display: "none"}, {y: 0, opacity: 1, display: "block"}, 0)
    };

    function mousewheelListenerTrue() {
        mouseListener = true;
        console.log('complete');
    }

    function linesDown(bigLinesId, smallLinesId) {
        const LinesDown = new Timeline({onComplete: mousewheelListenerTrue});
        LinesDown
            .to('#screen-lines__move-0-' + bigLinesId, 0.5, {ease: Power1.easeInOut, height: documentHeight}, 0)
            .to('#screen-lines__move-1-' + bigLinesId, 0.5, {ease: Power1.easeInOut, height: documentHeight}, 0)
            .to('#screen-lines__move-2-' + bigLinesId, 0.5, {ease: Power1.easeInOut, height: documentHeight}, 0)
            .to('#screen-lines__move-3-' + bigLinesId, 0.5, {ease: Power1.easeInOut, height: documentHeight}, 0)
            .to('#screen-lines__move-4-' + bigLinesId, 0.5, {ease: Power1.easeInOut, height: documentHeight}, 0)
            .to('#screen-lines__move-0-' + smallLinesId, 0.3, {ease: Power1.easeInOut, height: smallLineHeight1}, 0.5)
            .to('#screen-lines__move-1-' + smallLinesId, 0.3, {ease: Power1.easeInOut, height: smallLineHeight2}, 0.5)
            .to('#screen-lines__move-2-' + smallLinesId, 0.3, {ease: Power1.easeInOut, height: smallLineHeight3}, 0.5)
            .to('#screen-lines__move-3-' + smallLinesId, 0.3, {ease: Power1.easeInOut, height: smallLineHeight4}, 0.5)
            .to('#screen-lines__move-4-' + smallLinesId, 0.3, {ease: Power1.easeInOut, height: smallLineHeight5}, 0.5);
    }

    function linesUp(bigLinesId, smallLinesId) {
        const LinesUp = new Timeline({onComplete: mousewheelListenerTrue});
        LinesUp
            .to('#screen-lines__move-0-' + bigLinesId, 0.47, {height: smallLineHeight1}, 0.3)
            .to('#screen-lines__move-1-' + bigLinesId, 0.5, {height: smallLineHeight2}, 0.3)
            .to('#screen-lines__move-2-' + bigLinesId, 0.47, {height: smallLineHeight3}, 0.3)
            .to('#screen-lines__move-3-' + bigLinesId, 0.5, {height: smallLineHeight4}, 0.3)
            .to('#screen-lines__move-4-' + bigLinesId, 0.47, {height: smallLineHeight5}, 0.3)
            .to('#screen-lines__move-0-' + smallLinesId, 0.3, {height: 0}, 0)
            .to('#screen-lines__move-1-' + smallLinesId, 0.3, {height: 0}, 0)
            .to('#screen-lines__move-2-' + smallLinesId, 0.3, {height: 0}, 0)
            .to('#screen-lines__move-3-' + smallLinesId, 0.3, {height: 0}, 0)
            .to('#screen-lines__move-4-' + smallLinesId, 0.3, {height: 0}, 0);
    }

    function contentChanging(contentInd, transformVal, next) {
        const contentChanging = new Timeline();
        contentChanging
            .to('#contentItem-' + contentInd, 0.4, {y: transformVal, opacity: 0, display: "none"}, 0)
            .fromTo('#contentItem-' + (contentInd + next), 0.4, {y: -transformVal, opacity: 0, display: "none"}, {
                y: 0,
                opacity: 1,
                display: "block"
            }, 0.4)
            .to('#screenImg-' + contentInd, 0.4, {y: transformVal, opacity: 0, display: "none"}, 0)
            .fromTo('#screenImg-' + (contentInd + next), 0.4, {y: -transformVal, opacity: 0, display: "none"}, {
                y: 0,
                opacity: 1,
                display: "block"
            }, 0.4)
    }

    function forAboutUs() {
        const aboutUs = new Timeline();
        aboutUs
            .from('.about-us__right', 2, {ease: Power2.easeIn, opacity: 0});
    }

    let scrollCounter;
    let countOfPages = $('.content-inner-item').length;

    function scrollAnim() {
        $(document).bind('DOMMouseScroll mousewheel', function (e) {
            if (mouseListener === true) {
                if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
                    if (scrollCounter !== 0) {
                        mouseListener = false;
                        linesUp(scrollCounter - 1, scrollCounter);
                        contentChanging(scrollCounter, 50, -1);
                        console.log('up');
                        console.log(scrollCounter);
                        if ($('#contentItem-' + (scrollCounter - 1)).hasClass('about-us')) {
                            forAboutUs()
                        }
                        if (scrollCounter !== 0 && scrollCounter !== 1 && (scrollCounter - 1) % 2 === 0) {
                            console.log('white');
                            console.log(scrollCounter);
                            $('.header').addClass('white-theme')
                        } else {
                            $('.header').removeClass('white-theme');
                        }
                        scrollCounter--;
                    }
                }
                else {
                    if (scrollCounter < countOfPages - 1) {
                        mouseListener = false;
                        linesDown(scrollCounter, scrollCounter + 1);
                        contentChanging(scrollCounter, -50, 1);
                        console.log('down');
                        console.log(scrollCounter);
                        if ($('#contentItem-' + (scrollCounter + 1)).hasClass('about-us')) {
                            console.log(12345);
                            forAboutUs()
                        }
                        if (scrollCounter !== 0 && (scrollCounter + 1) % 2 === 0) {
                            $('.header').addClass('white-theme');
                        } else {
                            $('.header').removeClass('white-theme');
                        }
                        scrollCounter++;
                    }
                }
            }
        });
    }
    scrollAnim();

    let onResOnce = true;

    if (window.innerWidth > 1100) {
        mouseListener = true;

        $('.screen-lines').removeClass('dispNone');
        $('.screen-img').removeClass('dispNone');
        contentItems.removeClass('dispBlock');
        if(onResOnce){
            welcomeLines();
            welcomeContent();
        }
        onResOnce = false;


        console.log('bolshe');
        scrollCounter = 0;
    } else {
        onResOnce = true;
        mouseListener = false;
        destroyAnim(contentItems, onResOnce);
        console.log('menshe');
    }

    $(window).resize(function () {
        if (window.innerWidth > 1100) {
            mouseListener = true;

            $('.screen-lines').removeClass('dispNone');
            $('.screen-img').removeClass('dispNone');
            contentItems.removeClass('dispBlock');
            if(onResOnce){
                welcomeLines();
                welcomeContent();
            }
            onResOnce = false;


            console.log('bolshe');
            scrollCounter = 0;
        } else {
            onResOnce = true;
            mouseListener = false;
            destroyAnim(contentItems, onResOnce);
            console.log('menshe');
        }
    });
});


function initAnim(contentItems, onResOnce,  func1, func2){
    $('.screen-lines').removeClass('dispNone');
    $('.screen-img').removeClass('dispNone');
    contentItems.removeClass('dispBlock');
    if(onResOnce){
        func1();
        func2();
    }
    onResOnce = false;
}

function destroyAnim(contentItems, onResOnce){
    onResOnce = true;
    $('.screen-lines').addClass('dispNone');
    $('.screen-img').addClass('dispNone');
    contentItems.addClass('dispBlock');
}


