/**
 * 스크롤 애니메이션 유틸리티
 * 섹션이 뷰포트에 들어올 때, 해당 섹션 내 .fade-in 요소들을 순차적으로 등장시킴
 */

const observerOptions = {
  root: null,
  rootMargin: '-20px 0px',
  threshold: 0.1,
};

/** 섹션 내 .fade-in 요소들에 순차 delay 적용 (한 줄씩 등장) */
const STAGGER_DELAY_MS = 120;

// 섹션별로 이미 처리되었는지 추적
const processedSections = new WeakSet();

/** 섹션 내 .fade-in 요소들을 순차적으로 등장시킴 */
function revealStaggeredInSection(section) {
  if (processedSections.has(section)) return;
  processedSections.add(section);

  const fadeElements = Array.from(section.querySelectorAll('.fade-in')).filter(
    el => !el.classList.contains('visible')
  );
  
  if (fadeElements.length === 0) return;

  fadeElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, index * STAGGER_DELAY_MS);
  });
}

export const initScrollAnimation = () => {
  if (window.scrollAnimationInitialized) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        revealStaggeredInSection(entry.target);
      }
    });
  }, observerOptions);

  // 모든 섹션과 footer 관찰
  const sections = document.querySelectorAll('section, footer');
  sections.forEach((section) => {
    observer.observe(section);
  });

  window.scrollAnimationInitialized = true;
};

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimation);
  } else {
    // 약간의 지연을 두고 실행 (DOM이 완전히 렌더링된 후)
    setTimeout(initScrollAnimation, 100);
  }

  const mutationObserver = new MutationObserver(() => {
    if (!window.scrollAnimationInitialized) {
      setTimeout(initScrollAnimation, 100);
    }
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
