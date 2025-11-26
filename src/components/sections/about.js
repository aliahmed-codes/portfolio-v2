import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'JavaScript (ES6+)',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'WordPress (custom theme builds)',
    'Shopify (custom themes)',
    'Server setup & management',
    'MongoDB',
    'PostgreSQL',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Ali Ahmed, and I enjoy creating things that live on the internet. My
              journey in web development began in 2020 when I first got internet access at home and
              first time intrect with web industery. I started with WordPress and, within a year,
              landed my first client from the local Pakistani market. In 2023, I officially dove
              into coding and learned the MERN stack under the guidance of an incredible teacher and
              mentor,{' '}
              <a
                href="https://www.linkedin.com/in/mianahmadbasit/"
                target="_blank"
                rel="noreferrer">
                Mian Ahmed Basit
              </a>{' '}
              from Arfa Software Technology.
            </p>

            <p>
              Fast-forward to today, I’ve had the privilege of working at
              <a href="https://futuredevsolutions.com/" target="_blank" rel="noreferrer">
                a software development services company
              </a>
              ,{' '}
              <a
                href="https://www.linkedin.com/company/textcom-solutions/"
                target="_blank"
                rel="noreferrer">
                a start-up
              </a>
              , and{' '}
              <a href="https://www.eshaafi.com/" target="_blank" rel="noreferrer">
                a digital healthcare / telehealth platform
              </a>
              . These days, I focus on providing web-based solutions to international clients in the
              UK and Spain, and building award-level UI/UX projects at
              <a href="https://signalovernoise.io/" target="_blank" rel="noreferrer">
                Signal Over Noise
              </a>
              .
            </p>

            <p>
              I also recently created a{' '}
              <a href="https://www.drhafizharoon.com/" target="_blank" rel="noreferrer">
                portfolio for a doctor
              </a>
              , where users can book appointments and attend meetings online directly on the site,
              without needing Google Meet. The platform also includes an admin panel so doctors can
              manage appointments, services, pricing, and even publish blogs.
            </p>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
