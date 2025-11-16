import React, { useEffect, useRef } from "react";
import "../css/StackScroll.css";
import { ScrollObserver, valueAtPercentage } from "aatjs";
import TextPressure from "./TextPressure";
import ScrollFloat from "./ScrollFloat";
import GlassSurface from "./GlassSurface";

function StackScroll() {
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cardsContainer = cardsContainerRef.current;
    const cards = cardsRef.current;

    if (!cardsContainer || cards.length === 0) return;

    // Set CSS properties
    cardsContainer.style.setProperty("--cards-count", cards.length);

    if (cards[0]) {
      const cardHeight = cards[0].clientHeight;
      cardsContainer.style.setProperty("--card-height", `${cardHeight}px`);
    }

    // Setup scroll observers for each card
    Array.from(cards).forEach((card, index) => {
      const offsetTop = 140 + index * 20;
      card.style.paddingTop = `${offsetTop}px`;

      // Skip the last card for observer setup
      if (index === cards.length - 1) {
        return;
      }

      const toScale = 1 - (cards.length - 1 - index) * 0.1;
      const nextCard = cards[index + 1];
      const cardInner = card.querySelector(".card__inner");

      if (!cardInner || !nextCard) return;

      // Create scroll observer for the next card
      ScrollObserver.Element(nextCard, {
        offsetTop,
        offsetBottom: window.innerHeight - card.clientHeight,
      }).onScroll(({ percentageY }) => {
        const scale = valueAtPercentage({
          from: 1,
          to: toScale,
          percentage: percentageY,
        });
        const brightness = valueAtPercentage({
          from: 1,
          to: 0.6,
          percentage: percentageY,
        });

        cardInner.style.scale = scale;
        cardInner.style.filter = `brightness(${brightness})`;
      });
    });

    // Cleanup function
    return () => {
      // Clean up observers if needed
    };
  }, []);

  // Function to add cards to ref array
  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Reset cardsRef when component unmounts
  useEffect(() => {
    return () => {
      cardsRef.current = [];
    };
  }, []);

  return (
    <>
      <div className="space space--small"></div>
      {/* <h2 className="card-title">How To Access it?</h2> */}
      <ScrollFloat
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="center bottom+=20%"
        scrollEnd="bottom bottom-=40%"
        stagger={0.03}
      >
        How To Access it?
      </ScrollFloat>
      <div className="cards" ref={cardsContainerRef}>
        <div className="card" data-index="0" ref={addToCardsRef}>
            
          <div className="card__inner">
            <div className="card__image-container">
              <img
                className="card__image"
                src="https://images.unsplash.com/photo-1620207418302-439b387441b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=100"
                alt="Nature"
              />
            </div>
            <div className="card__content">
              <h1 className="card__title">Click Upload</h1>
              <p className="card__description">
                Click button upload in hero section or navbar section
              </p>
            </div>
          </div>
        </div>
        <div className="card" data-index="1" ref={addToCardsRef}>
          <div className="card__inner">
            <div className="card__image-container">
              <img
                className="card__image"
                src="https://images.unsplash.com/photo-1620207418302-439b387441b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=100"
                alt="Nature"
              />
            </div>
            <div className="card__content">
              <h1 className="card__title">Drag & Drop Picture</h1>
              <p className="card__description">
                Drag & Drop What Image You Want to Change the URL
              </p>
            </div>
          </div>
        </div>
        <div className="card" data-index="2" ref={addToCardsRef}>
          <div className="card__inner">
            <div className="card__image-container">
              <img
                className="card__image"
                src="https://images.unsplash.com/photo-1620207418302-439b387441b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=100"
                alt="Nature"
              />
            </div>
            <div className="card__content">
              <h1 className="card__title">URL Ready</h1>
              <p className="card__description">
                And Tada.. Your Image URL Is Ready
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="space"></div>
    </>
  );
}

export default StackScroll;
