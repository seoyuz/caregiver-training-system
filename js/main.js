document.addEventListener('DOMContentLoaded', function() {
    const bannerSwiper = new Swiper('.banner-swiper', {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation : {
            nextEl : '.btn-next',
            prevEl : '.btn-prev',
        },
        pagination: {
            el: ".pagination",
            clickable: true,
            // type: "fraction",
        },
        observer: true,	// 추가
        observeParents: true,	// 추가
        on: {
            init: function() {
                resetTabindex();
            },
            slideChangeTransitionEnd: function() {
                resetTabindex();
            },
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            1366: {
                slidesPerView: 1,
            },
        },
    });

    // 재생 정지
    const playButton = document.querySelector('.control-box .autoplay');
    let isPlaying = true;
    
    playButton.addEventListener("click", function() {
        isPlaying = !isPlaying;

        if (isPlaying) {
            playButton.querySelector(".play").style.display = "none";
            playButton.querySelector(".pause").style.display = "block";
            bannerSwiper.autoplay.start();
            playButton.setAttribute("title", "정지하기");
        } else {
            playButton.querySelector(".play").style.display = "block";
            playButton.querySelector(".pause").style.display = "none";
            bannerSwiper.autoplay.stop();
            playButton.setAttribute("title", "재생하기");
        }
    });

    // 웹접근성
    function resetTabindex() {
        const slides = document.querySelectorAll(".banner-swiper .swiper-slide");
        const activeSlide = document.querySelector(".banner-swiper .swiper-slide-active");

        // 슬라이드가 존재하지 않으면 실행 중단
        if (!slides || slides.length === 0) {
            return;
        }

        // 모든 슬라이드의 링크에서 tabindex를 -1로 설정
        slides.forEach(slide => {
            const link = slide.querySelector('a');
            
            link.setAttribute('tabindex', '-1');
        });

        // 활성 슬라이드의 링크 tabindex를 0으로 설정
        // if (activeSlide) {
            const activeLink = activeSlide.querySelector('a');
            
            activeLink.setAttribute('tabindex', '0');
        // }
    }

    // 화면 크기가 변경될 때마다 레이아웃 재조정
    window.addEventListener('resize', function() {
        const screenWidth = window.innerWidth;
        const spanText = document.querySelector(".map-wrap .control-box button span");

        if (screenWidth <= 980) { // 화면 크기가 980px 이하일 때
            spanText.innerText = "내 위치";
        } else { // 화면 크기가 981px 이상일 때
            spanText.innerText = "내 위치 보기";
        }
    });

    // 초기 로드 시에도 레이아웃 재조정
    window.dispatchEvent(new Event('resize'));
});