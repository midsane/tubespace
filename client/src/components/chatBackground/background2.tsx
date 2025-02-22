import styled from 'styled-components';

export const Pattern2 = () => {
    return (
        <StyledWrapper>
            <div className="container" />
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .container {
    width: 100vw;
    height: 300vh;
    opacity: 90%;
    --color: #a748f5;
    background: linear-gradient(95deg, var(--color) 25%, transparent 25%) -50px 0,
          linear-gradient(-15deg, var(--color) 25%, transparent 25%) -50px 0,
          linear-gradient(25deg, transparent 75%, var(--color) 75%) -50px 0,
          linear-gradient(-45deg, transparent 75%, var(--color) 75%) -50px 0,
          linear-gradient(-15deg, transparent 75%, var(--color) 75%) -50px 0;
    background-color: #b669fd;
    background-size: 40px 40px;
  }`;

