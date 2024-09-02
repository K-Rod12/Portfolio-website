import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import MemojiImage from '../../images/Memoji.png';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: row;
  justify-content: space-between;
  min-height: 100vh;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 0 50px;
  }

  .typed-text {
    border-right: 0.15em solid #333;
    white-space: nowrap;
    overflow: hidden;
    letter-spacing: 0.15em;
    animation: typewriter 4s steps(44) 1s 1 normal both,
      blinkTextCursor 500ms steps(44) infinite normal;
  }
  .typed-text::after {
    content: '';
    display: inline-block;
    width: 0px;
    border-right: 0.15em solid #ffffff;
    animation: typewriter-after 4s steps(44) 1s 1 normal both,
      blinkTextCursor-after 500ms steps(44) infinite normal;
  }
  @keyframes typewriter {
    from {
      width: 0;
    }
    to {
      width: 27%;
    }
  }
  @keyframes blinkTextCursor {
    from {
      border-right-color: #ffffff;
    }
    to {
      border-right-color: transparent;
    }
  }
  @keyframes typewriter-after {
    from {
      width: 0;
    }
    to {
      width: 0.15em;
    }
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--orange);
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

  const one = <h1 className="typed-text">Hi, my name is </h1>;
  const two = <h2 className="big-heading">Kenley Rodriguez.</h2>;
  const three = <h3 className="big-heading">I like to build things!</h3>;
  const four = (
    <>
      <p>
        I am a full-stack Software Engineer with a passion for building scalable and user-friendly
        web applications. I am currently job searching for a full-time role as a Junior/Mid level
        Software Engineer.
      </p>
    </>
  );
  const five = (
    <div
      style={{
        marginBottom: '50px',
      }}>
      <img src={MemojiImage} alt="Memoji"></img>
    </div>
  );

  const textItems = [one, two, three, four];

  return (
    <StyledHeroSection>
      <TextSection>
        {prefersReducedMotion ? (
          <>
            {textItems.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              textItems.map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </TextSection>
      <ImageSection>
        {isMounted && (
          <CSSTransition classNames="fadeup" timeout={loaderDelay}>
            <div style={{ transitionDelay: `1000ms` }}>{five}</div>
          </CSSTransition>
        )}
      </ImageSection>{' '}
    </StyledHeroSection>
  );
};

export default Hero;
const TextSection = styled.div`
  flex: 4;
  max-width: 100%;
`;

const ImageSection = styled.div`
  flex: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  img {
    max-width: 400px;
    height: auto;
  }

  @media (max-width: 1200px) {
    img {
      max-width: 350px;
    }
  }

  @media (max-width: 768px) {
    justify-content: center;

    img {
      max-width: 300px;
    }
  }
`;
