import styled from 'styled-components';

export const Face = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    /* justify-content: space-around;  */
`

export const Face2 = styled(Face)`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    height: 310px;
    background-image: linear-gradient(
        40deg,
        #ffeb3b 0%,
        #FAB629 45%,
        #f57f17 100%
      );
    border-radius: 15px;
`

export const Face2Title = styled.h2`
    margin: 0;
    padding: 0;
    font-size: 4em;
    color: black;
    transition: 0.5s;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 10;
`

export const Face2Heading = styled.h2`
    margin: 0;
    padding: 0;
    font-size: 10em;
    color: black;
    transition: 0.5s;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 10;
`

export const Card = styled.div`
    border-top: 8px solid #4C2CAC;
    position: relative;
    width: 250px;
    height: 350px;
    margin: 20px auto;
    color: black;
    /* background-color: #1e272e; */
    background-color: white;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    cursor: pointer;

    &:hover {
        ${Face2} {
            height: 0;
            flex-direction: row;
            justify-content: space-evenly;

            ${Face2Title} {
                font-size: 0em;
            }

            ${Face2Heading} {
                font-size: 0em;
            }
        }
    }
`

export const Face1 = styled(Face)`
    color: black;
`

export const Face1Heading = styled.h5`
    margin: 5px;
    padding: 0;
`

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
`

export const ImageWrapper = styled.div`
    width: 100%;
    text-align: center;
`

export const Img = styled.img`
    transition: ease 2s all;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    width: 250px;
    
    &:hover {
        transition: ease 2s all ;
        animation: none;
        /* transform: rotate(-30deg) translate( 10px, 66px); */
    }
`










