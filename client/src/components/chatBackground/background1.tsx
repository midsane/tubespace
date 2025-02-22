import styled from 'styled-components';

export const Pattern1 = () => {
    return (
        <StyledWrapper>
            <div className="container" />
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .container {
    --bg: radial-gradient(#000 5%, #0000 6%);
    --size: 3rem;
    width: 100vw;
    height: 100vh;

    background-image: radial-gradient(#000 5%, #0000 6%),
      radial-gradient(#000 5%, #0000 6%);
    background-position: 0 0, calc(var(--size) / 2) calc(var(--size) / 2);
    background-size: var(--size) var(--size);
  }`;

