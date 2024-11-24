import { useRef, useState, useCallback } from "react";

const useDragScroll = () => {
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  let animationFrame;
  const [isDraggingState, setIsDraggingState] = useState(false);

  const handleMouseDown = useCallback((e) => {
    const container = scrollContainerRef.current;
    isDragging.current = true;
    startX.current = e.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
    velocity.current = 0;
    container.style.scrollBehavior = "auto";
    setIsDraggingState(true);
  }, []);

  const handleTouchStart = useCallback((e) => {
    const container = scrollContainerRef.current;
    isDragging.current = true;
    startX.current = e.touches[0].pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
    velocity.current = 0;
    container.style.scrollBehavior = "auto";
    setIsDraggingState(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;

    const container = scrollContainerRef.current;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const delta = x - startX.current;

    velocity.current = delta * 0.2;
    container.scrollLeft = scrollLeft.current - delta;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current) return;

    const container = scrollContainerRef.current;
    e.preventDefault();
    const x = e.touches[0].pageX - container.offsetLeft;
    const delta = x - startX.current;

    velocity.current = delta * 0.2;
    container.scrollLeft = scrollLeft.current - delta;
  }, []);

  const handleMouseUpOrLeave = useCallback(() => {
    if (!isDragging.current) return;

    isDragging.current = false;
    setIsDraggingState(false);
    addSmoothScrolling();
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;

    isDragging.current = false;
    setIsDraggingState(false);
    addSmoothScrolling();
  }, []);

  const addSmoothScrolling = useCallback(() => {
    const container = scrollContainerRef.current;

    const smoothScroll = () => {
      velocity.current *= 0.95; // Reduce velocity gradually
      container.scrollLeft -= velocity.current;

      if (Math.abs(velocity.current) > 0.5) {
        animationFrame = requestAnimationFrame(smoothScroll);
      } else {
        cancelAnimationFrame(animationFrame);
      }
    };

    smoothScroll();
  }, []);

  return {
    scrollContainerRef,
    isDraggingState,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useDragScroll;
