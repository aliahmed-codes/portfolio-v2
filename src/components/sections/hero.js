import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Ali Ahmed.</h2>;
  const three = <h3 className="big-heading">I build things for the web.</h3>;
  const four = (
    <>
      <p>
        I’m a full-stack developer who enjoys creating fast, clean and reliable digital experiences.
        I work with{' '}
        <a href="https://react.dev/" target="_blank" rel="noreferrer">
          React
        </a>
        ,{' '}
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          Next.js
        </a>
        ,{' '}
        <a href="https://wordpress.org/" target="_blank" rel="noreferrer">
          WordPress
        </a>
        ,{' '}
        <a href="https://www.shopify.com/" target="_blank" rel="noreferrer">
          Shopify
        </a>
        ,{' '}
        <a href="https://nodejs.org/" target="_blank" rel="noreferrer">
          Node.js
        </a>{' '}
        and{' '}
        <a href="https://bun.sh/" target="_blank" rel="noreferrer">
          Bun
        </a>{' '}
        to build custom solutions that solve real problems. I’m currently focused on crafting
        polished, meaningful work aimed at{' '}
        <a href="https://www.awwwards.com/" target="_blank" rel="noreferrer">
          award-level
        </a>{' '}
        recognition.
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://www.newline.co/courses/build-a-spotify-connected-app"
      target="_blank"
      rel="noreferrer">
      Check out my course!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
