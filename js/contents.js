document.addEventListener('DOMContentLoaded', function() {
    const body = document.body

    function windowResizing() {
        if (window.innerWidth < 1200) {
            document.body.classList.remove('pc');
            document.body.classList.add('mobile');

            /* flicking 추가 */
            document.querySelectorAll('.flicking').forEach(tableFlicking => {
                // ✅ 이미 감싸져 있으면 다시 감싸지 않음
                if (!tableFlicking.closest('.f_wrapper')) {
                    wrapFlicking(tableFlicking);
                }
            });

            function createWrapper() {
                const outerFlickingWrap = document.createElement('div');
                outerFlickingWrap.className = 'f_wrapper';

                const innerFlickingWrap = document.createElement('div');
                innerFlickingWrap.className = 'f_wrapper_inner';

                const scroller = document.createElement('div');
                scroller.className = 'f_scroller';
                
                innerFlickingWrap.appendChild(scroller);
                outerFlickingWrap.appendChild(innerFlickingWrap);

                return { outerFlickingWrap, scroller };
            }

            function wrapFlicking(target) {
                const { outerFlickingWrap, scroller } = createWrapper();
                target.parentNode.insertBefore(outerFlickingWrap, target);
                scroller.appendChild(target);
            }


        } else {
            document.body.classList.add('pc');
            document.body.classList.remove('mobile');

            /* flicking 제거 */
            document.querySelectorAll('.flicking').forEach(flicking => {
                const wrapper = flicking.closest('.f_wrapper');
                if (wrapper) {
                    // flicking을 wrapper의 부모 바로 밑으로 이동
                    wrapper.parentNode.insertBefore(flicking, wrapper);
                    wrapper.remove();
                }
            });

        }

        const screenWidth = window.innerWidth;
        const spanText = document.querySelector(".map-wrap .control-box button span");

        if (screenWidth <= 980) {
            spanText.innerText = "내 위치";
        } else {
            spanText.innerText = "내 위치 보기";
        }
    }

    // resize 이벤트에 등록
    window.addEventListener('resize', windowResizing);
    windowResizing();


    // 사이드패널
    const sidePanel = document.querySelector('.map-wrap .side-panel');
    const toggleButton =  sidePanel.querySelector('.btn-toggle');

    toggleButton.addEventListener('click', function() {
        if(body.classList.contains('pc')) {

            if (sidePanel.classList.contains('close')) {
                sidePanel.classList.remove('close');
                toggleButton.setAttribute('title', '접기');
            } else {
                sidePanel.classList.add('close');
                toggleButton.setAttribute('title', '열기');
            }

        } else{

            if (sidePanel.classList.contains('close')) {
                sidePanel.classList.remove('close');
                toggleButton.setAttribute('title', '접기');

            } else {
                sidePanel.classList.add('close');
                toggleButton.setAttribute('title', '열기');
            }

        }
    });

    //dropdown
    const dropdownBox = document.querySelector('.dropdown-box');
    const dropdown = dropdownBox.querySelector('.dropdown');
    const dropdownInp = dropdownBox.querySelector('input');

    dropdownInp.addEventListener('click', function(e){
        e.stopPropagation();

        let isActive = dropdownBox.classList.contains('active');
        if(!isActive) {
            dropdownBox.classList.add('active');
        }

        document.body.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target) && !dropdownInp.contains(e.target)) {
                dropdownBox.classList.remove('active');
            }
        }, { once: true });
    });

    dropdownInp.addEventListener('focus', function(e){
        e.stopPropagation();
        dropdownBox.classList.add('active');
    });

    dropdownBox.addEventListener('focusout', function(e){
        if (!dropdownBox.contains(e.relatedTarget)) {
            dropdownBox.classList.remove('active');
        }
    });

});