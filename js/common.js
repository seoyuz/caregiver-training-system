document.addEventListener('DOMContentLoaded', function() {
    
    /* 251014 웹 접근성 품질개선 - input/textarea.inp 지우기 버튼 동적 생성 (ej) */  
    // input.inp, textarea.inp 옆에 지우기 버튼 동적 추가
    document.querySelectorAll('input.inp, textarea.inp').forEach(function(inp) {
        // 이미 버튼이 있으면 중복 추가 방지
        if (!inp.parentNode.querySelector('.form-control-clear')) {
            var clearBtn = document.createElement('button');
            clearBtn.type = 'button';
            clearBtn.className = 'form-control-clear hidden';
            clearBtn.textContent = '지우기';
            // input 바로 뒤에 삽입
            inp.parentNode.insertBefore(clearBtn, inp.nextSibling);

            // 버튼 클릭 시 입력값 삭제 및 포커스
            clearBtn.addEventListener('click', function() {
                inp.value = '';
                clearBtn.classList.add('hidden');
                inp.focus();
                // 필요시 input 이벤트도 발생
                var event = new Event('input', { bubbles: true });
                inp.dispatchEvent(event);
            });
        }
    });

    // 입력값 있을 때만 버튼 노출
    function toggleClearButton(e) {
        var inp = e.target;
        var clearBtn = inp.parentNode.querySelector('.form-control-clear');
        if (!clearBtn) return;
        if (inp.value) {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }
    }

    document.querySelectorAll('input.inp, textarea.inp').forEach(function(inp) {
        inp.addEventListener('input', toggleClearButton);
        // 초기 상태 반영
        toggleClearButton({ target: inp });
    });
    /* // 251014 웹 접근성 품질개선 - input/textarea.inp 지우기 버튼 동적 생성 (ej) */  
document.querySelectorAll('.form-field').forEach(inpWrap => {
    const input = inpWrap.querySelector('.inp');
    const inpTxt = inpWrap.querySelector('.inp-txt');

    if (!input) return;

    const CLASS = {
        focus: 'focus',
        completed: 'completed',
        error: 'error'
    };

    // focus 전용 초기화 (error는 건드리지 않음)
    function resetFocusState() {
        input.classList.remove(CLASS.focus);

        if (inpTxt) {
            inpTxt.classList.remove(CLASS.focus);
        }
    }

    // 숫자만 입력
    input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '');
    });

    // focus 상태
    input.addEventListener('focus', () => {
        resetFocusState();
        input.classList.add(CLASS.focus);

        if (inpTxt) {
            inpTxt.classList.add(CLASS.focus);
        }
    });

    // blur 상태 (포커스 아웃)
    input.addEventListener('blur', () => {
        resetFocusState();
        // ⚠ error / completed는 유지
    });
});




    

    function setFocusTrap() {
        const focusableElements = globalSearch.querySelectorAll('input, button, a');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        //첫번째 포커스 요소에
        firstFocusable.addEventListener('keydown', function(e) {
            if(e.shiftKey && e.key === 'Tab'){
                e.preventDefault();
                lastFocusable.focus();
            }
        });
        lastFocusable.addEventListener('keydown', function(e) {
            if(!e.shiftKey && e.key ==='Tab') {
                e.preventDefault();
                firstFocusable.focus();
            }
        });

        firstFocusable.focus();
    }

    /* modal popup */
    let lastFocusedElement = null;

    // 포커스 가능한 요소 찾기
    function getFocusableElements(container) {
        return Array.from(container.querySelectorAll(
            "button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])"
        ));
    }

    // 포커스 트랩
    function setFocusTrap(popup) {
        const focusable = getFocusableElements(popup);
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        first.focus();

        popup.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
    }

    // 모달 열기
    document.querySelectorAll('.modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const popupId = btn.dataset.popup;
            const popup = document.getElementById(popupId);

            lastFocusedElement = document.activeElement;

            // 다른 팝업 닫기
            document.querySelectorAll('.modal-wrap.open').forEach(p => {
                p.classList.remove('open');
                p.style.display = 'none';
                p.setAttribute('tabindex', '-1');
            });

            // 팝업 열기
            popup.classList.add('open');
            popup.style.display = 'block';
            popup.setAttribute('tabindex', '0');

            document.body.classList.add('overflow');

            setFocusTrap(popup);
        });
    });

    // 모달 닫기
    document.querySelectorAll('.modal-close, .b-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const popup = btn.closest('.modal-wrap');
            if (!popup) return;

            popup.classList.remove('open');
            popup.style.display = 'none';
            popup.setAttribute('tabindex', '-1');

            document.body.classList.remove('overflow');

            if (lastFocusedElement) {
                setTimeout(() => {
                    lastFocusedElement.focus();
                    lastFocusedElement = null;
                }, 10);
            }
        });
    });

});


// $(document).ready(function(){
//     /* 251013 웹 접근성 품질개선 - 팝업 포커스 수정 (ej) */
//     //layer popup
//     // 초기 팝업 상태에서 포커스 트랩 설정
//     function setFocusTrap(popupElement) {
//         var focusableElements = popupElement.find("button, .datepicker, .datepicker2, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
//         var firstFocusable = focusableElements.first();
//         var lastFocusable = focusableElements.last();

//         // 첫 번째 요소에서 Shift+Tab 시 마지막 요소로 이동
//         firstFocusable.on('keydown', function(event) {
//             if (event.shiftKey && event.key === 'Tab') {
//                 event.preventDefault();
//                 lastFocusable.focus();
//             }
//         });

//         // 마지막 요소에서 Tab 시 첫 번째 요소로 이동
//         lastFocusable.on('keydown', function(event) {
//             if (!event.shiftKey && event.key === 'Tab') {
//                 event.preventDefault();
//                 firstFocusable.focus();
//             }
//         });

//         // 팝업 열림 시 첫 포커스 위치
//         firstFocusable.focus();
//     }

//     // 페이지 로드 시 열린 팝업의 포커스 트랩 적용
//     // $(document).ready(function() {
//         $('.modal-wrap.open').each(function() {
//             setFocusTrap($(this)); // 열린 팝업에 포커스 트랩 적용
//         });
//     // });

//     // 모달 버튼 클릭 시 포커스 트랩 재적용
//     $(document).on('click', '.modal-btn', function (event) {
//         event.preventDefault();
//         var popupId = $(this).attr('data-popup');
//         var popupElement = $("#" + popupId);

//         // 팝업 열기 전 현재 포커스된 요소 저장
//         lastFocusedElement = document.activeElement;

//         var popupMain = $(this).attr('data-main');
//         if (!popupMain || popupMain !== "Y") {
//             $('.modal-wrap').removeClass('open').fadeOut().attr("tabindex", "-1");
//         }

//         // 팝업 열기
//         popupElement.addClass('open').fadeIn().attr("tabindex", "0");

//         // 스크롤방지 설정
//         $('body').addClass('overflow');

//         // 포커스 트랩 설정
//         setFocusTrap(popupElement);
//     });

//     // 닫기 버튼 클릭 시 포커스 해제 및 이전 위치로 포커스 복원
//     $(document).on('click', '.modal-close, .b-close', function (event) {
//         event.preventDefault();
//         var popup = $(this).closest('.modal-wrap');

//         // 팝업 닫기
//         popup.removeClass('open').fadeOut().attr("tabindex", "-1");

//         // 스크롤방지 해제
//         $('body').removeClass('overflow');


//         // aria-hidden 속성 해제
//         $('.skip-links, .masthead, .initial-content, .search-content, .page__footer').removeAttr('aria-hidden');

//         // 이전 포커스 위치로 이동
//         if (lastFocusedElement) {
//             setTimeout(function() {
//                 lastFocusedElement.focus();
//                 lastFocusedElement = null;
//             }, 10);
//         }
//     });
//     /* // 251013 웹 접근성 품질개선 - 팝업 포커스 수정 (ej) */
// });


